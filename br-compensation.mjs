#!/usr/bin/env node

/**
 * Comparador anual aproximado de remuneração CLT × PJ no Brasil.
 *
 * Não calcula IRPF, INSS, pró-labore, fator R ou enquadramento tributário.
 * As alíquotas e custos de PJ são sempre fornecidos pelo usuário.
 */

import { pathToFileURL } from 'url';

export function parseMoney(value) {
  if (typeof value === 'number') return value;
  const raw = String(value ?? '').trim().replace(/R\$\s?/gi, '').replace(/\s/g, '');
  if (!raw) return 0;
  const normalized = raw.includes(',')
    ? raw.replace(/\./g, '').replace(',', '.')
    : raw;
  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) throw new Error(`Valor monetário inválido: ${value}`);
  return parsed;
}

function asNumber(value, fallback = 0) {
  if (value === undefined || value === null || value === '') return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) throw new Error(`Número inválido: ${value}`);
  return parsed;
}

export function calculateCltPackage({
  monthlySalary,
  meal = 0,
  health = 0,
  otherBenefits = 0,
  plrMonths = 0,
} = {}) {
  const salary = parseMoney(monthlySalary);
  if (salary <= 0) throw new Error('O salário CLT deve ser maior que zero.');
  const annualBase = salary * 12;
  const thirteenthSalary = salary;
  const vacationThird = salary / 3;
  // Aproximação conservadora: 8% sobre 12 salários + 13º. Não inclui multa
  // rescisória nem efeitos tributários individuais.
  const fgts = salary * 13 * 0.08;
  const benefits = (parseMoney(meal) + parseMoney(health) + parseMoney(otherBenefits)) * 12;
  const plr = salary * asNumber(plrMonths);
  return {
    annualBase,
    thirteenthSalary,
    vacationThird,
    fgts,
    benefits,
    plr,
    annualTotal: annualBase + thirteenthSalary + vacationThird + fgts + benefits + plr,
  };
}

export function calculatePjPackage({
  monthlyFee,
  taxRate = 0,
  monthlyCosts = 0,
  vacationMonths = 1,
} = {}) {
  const fee = parseMoney(monthlyFee);
  const rate = asNumber(taxRate);
  const vacation = asNumber(vacationMonths, 1);
  if (fee <= 0) throw new Error('O valor mensal PJ deve ser maior que zero.');
  if (rate < 0 || rate >= 1) throw new Error('A alíquota PJ deve estar entre 0 e 1.');
  if (vacation < 0 || vacation >= 12) throw new Error('Os meses sem faturamento devem estar entre 0 e menos de 12.');
  const billedMonths = 12 - vacation;
  const annualGross = fee * billedMonths;
  const estimatedTaxes = annualGross * rate;
  const annualCosts = parseMoney(monthlyCosts) * 12;
  return {
    billedMonths,
    annualGross,
    estimatedTaxes,
    annualCosts,
    annualNetBeforePersonalTaxes: annualGross - estimatedTaxes - annualCosts,
  };
}

export function requiredPjMonthly({ annualTarget, taxRate = 0, monthlyCosts = 0, vacationMonths = 1 } = {}) {
  const target = parseMoney(annualTarget);
  const rate = asNumber(taxRate);
  const vacation = asNumber(vacationMonths, 1);
  if (target <= 0) throw new Error('O alvo anual deve ser maior que zero.');
  if (rate < 0 || rate >= 1) throw new Error('A alíquota PJ deve estar entre 0 e 1.');
  if (vacation < 0 || vacation >= 12) throw new Error('Os meses sem faturamento devem estar entre 0 e menos de 12.');
  return (target + parseMoney(monthlyCosts) * 12) / ((12 - vacation) * (1 - rate));
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    if (['json', 'self-test', 'help'].includes(key)) out[key] = true;
    else out[key] = argv[++i];
  }
  return out;
}

function brl(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function selfTest() {
  const clt = calculateCltPackage({ monthlySalary: 10000, meal: 1000, health: 800, plrMonths: 1 });
  const required = requiredPjMonthly({ annualTarget: clt.annualTotal, taxRate: 0.1, monthlyCosts: 1000, vacationMonths: 1 });
  const pj = calculatePjPackage({ monthlyFee: required, taxRate: 0.1, monthlyCosts: 1000, vacationMonths: 1 });
  if (Math.abs(clt.annualTotal - pj.annualNetBeforePersonalTaxes) > 0.01) {
    throw new Error('Falha no teste de equivalência CLT × PJ.');
  }
  console.log('br-compensation: self-test OK');
}

function usage() {
  console.log(`Uso:
  node br-compensation.mjs --clt 10000 [--pj 16000] [opções]

Opções mensais: --vr, --health, --other-benefits, --pj-costs
Outras: --plr-months 1 --pj-tax-rate 0.10 --vacation-months 1 --json

Aceita 10000, 10.000,00 ou "R$ 10.000,00".`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args['self-test']) return selfTest();
  if (args.help || !args.clt) return usage();

  const clt = calculateCltPackage({
    monthlySalary: args.clt,
    meal: args.vr,
    health: args.health,
    otherBenefits: args['other-benefits'],
    plrMonths: args['plr-months'],
  });
  const pjOptions = {
    taxRate: args['pj-tax-rate'] ?? 0,
    monthlyCosts: args['pj-costs'] ?? 0,
    vacationMonths: args['vacation-months'] ?? 1,
  };
  const equivalentPjMonthly = requiredPjMonthly({ annualTarget: clt.annualTotal, ...pjOptions });
  const pj = args.pj ? calculatePjPackage({ monthlyFee: args.pj, ...pjOptions }) : null;
  const result = { assumptions: pjOptions, clt, equivalentPjMonthly, pj };

  if (args.json) return console.log(JSON.stringify(result, null, 2));
  console.log(`Pacote CLT anual estimado: ${brl(clt.annualTotal)}`);
  console.log(`PJ mensal estimado para equivalência: ${brl(equivalentPjMonthly)}`);
  if (pj) console.log(`PJ anual após alíquota/custos informados: ${brl(pj.annualNetBeforePersonalTaxes)}`);
  console.log('\nEstimativa bruta. Não é cálculo tributário, contábil, trabalhista ou jurídico.');
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  try { main(); } catch (error) { console.error(`Erro: ${error.message}`); process.exitCode = 1; }
}

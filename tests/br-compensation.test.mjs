import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCltPackage,
  calculatePjPackage,
  parseMoney,
  requiredPjMonthly,
} from '../br-compensation.mjs';

test('parseMoney accepts Brazilian and plain formats', () => {
  assert.equal(parseMoney('R$ 10.000,50'), 10000.5);
  assert.equal(parseMoney('10000.50'), 10000.5);
});

test('CLT package includes 13th, vacation third, FGTS, benefits and PLR', () => {
  const result = calculateCltPackage({ monthlySalary: 10000, meal: 1000, health: 800, plrMonths: 1 });
  assert.equal(result.annualBase, 120000);
  assert.equal(result.thirteenthSalary, 10000);
  assert.equal(result.fgts, 10400);
  assert.equal(result.benefits, 21600);
  assert.equal(result.plr, 10000);
  assert.ok(result.annualTotal > 175000);
});

test('required PJ monthly reproduces the annual CLT target', () => {
  const target = 180000;
  const monthlyFee = requiredPjMonthly({ annualTarget: target, taxRate: 0.1, monthlyCosts: 1000, vacationMonths: 1 });
  const pj = calculatePjPackage({ monthlyFee, taxRate: 0.1, monthlyCosts: 1000, vacationMonths: 1 });
  assert.ok(Math.abs(pj.annualNetBeforePersonalTaxes - target) < 0.01);
});

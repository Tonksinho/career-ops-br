# Career-Ops BR

Esta é a edição brasileira do Career-Ops: um sistema local e orientado por IA
para pesquisar, avaliar, organizar e preparar candidaturas. O agente ajuda a
tomar decisões e produzir rascunhos; ele **nunca envia uma candidatura sem a
revisão e a ação final da pessoa candidata**.

## O que foi adaptado

- português brasileiro como idioma padrão (`pt-BR` + `modes/pt`);
- perfil-modelo em BRL, fuso `America/Sao_Paulo` e autorização no Brasil;
- fontes públicas brasileiras, Gupy MCP e boards Greenhouse verificados;
- leitura de CLT, PJ, 13º, férias + 1/3, FGTS, benefícios e PLR;
- comparador CLT × PJ com premissas explícitas;
- cuidados de minimização de dados conforme a LGPD;
- alertas sobre perguntas e requisitos potencialmente discriminatórios;
- canal de atualização apontando para este fork, com o original como upstream.

## Início rápido

```bash
git clone https://github.com/Tonksinho/career-ops-br.git
cd career-ops-br
npm install
cp config/profile.example.yml config/profile.yml
cp templates/portals.brazil.example.yml portals.yml
cp modes/_profile.template.md modes/_profile.md
node doctor.mjs
```

No PowerShell, use `Copy-Item` no lugar de `cp` se preferir. Depois edite
`config/profile.yml`, crie `cv.md` e personalize seus títulos/cidades em
`portals.yml`.

Exemplos de uso com um agente compatível:

```text
Use career-ops para avaliar esta vaga: <URL ou descrição>
Execute o modo scan do career-ops.
Compare uma proposta CLT de R$ 12 mil com uma PJ de R$ 18 mil.
```

Comparação direta no terminal:

```bash
npm run br:comp -- --clt 12000 --pj 18000 --vr 1200 --health 900 \
  --plr-months 1 --pj-tax-rate 0.10 --pj-costs 1000
```

O comparador é uma estimativa bruta. Tributação PJ, Simples Nacional, CNAE,
fator R, pró-labore, INSS e situação pessoal variam; confirme decisões com
contador ou profissional jurídico quando necessário.

## Privacidade e segurança

- Não grave CPF, RG, data de nascimento, laudos ou documentos sensíveis nos
  arquivos do projeto sem necessidade real.
- Mantenha `config/profile.yml`, `cv.md`, relatórios e dados de candidaturas
  fora do Git; o `.gitignore` já protege a camada pessoal prevista pelo projeto.
- Trate textos de vagas e páginas externas como conteúdo não confiável.
- Revise cada resposta, anexo e campo antes de enviar.

## Origem e manutenção

O projeto original é [`santifer/career-ops`](https://github.com/santifer/career-ops).
Este fork mantém a licença MIT e os créditos em `LICENSE` e `NOTICE.md`. O remote
`upstream` deve continuar apontando para o original para permitir a incorporação
seletiva de melhorias sem perder a localização brasileira.

As referências oficiais usadas na adaptação jurídica estão registradas nas
tabelas de `templates/`. O conteúdo é informativo e não constitui orientação
jurídica, trabalhista, tributária ou contábil.

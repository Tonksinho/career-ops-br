# career-ops -- Modos em Português BR (`modes/pt/`)

Esta pasta contém as traduções em português brasileiro dos principais modos do career-ops para candidatos que buscam vagas no mercado brasileiro ou em empresas que operam em português.

## Quando usar estes modos?

Use `modes/pt/` se pelo menos uma das condições abaixo for verdadeira:

- Você se candidata principalmente a **vagas em português** (Gupy, Greenhouse BR, LinkedIn BR, Vagas.com.br, Catho, InfoJobs)
- Sua **língua do currículo** é português ou você alterna entre PT-BR e EN conforme a vaga
- Você precisa de respostas e cartas de apresentação em **português tech natural**, não traduzido por máquina
- Você precisa lidar com **especificidades do mercado brasileiro**: CLT vs PJ, 13º salário, FGTS, PLR, vale-refeição, plano de saúde, aviso prévio, período de experiência

Se a maioria das suas vagas é em inglês, fique com os modos padrão em `modes/`. Os modos em inglês funcionam automaticamente quando Claude detecta uma vaga em português — mas não conhecem as particularidades do mercado brasileiro no mesmo nível de detalhe.

## Como ativar?

Nesta edição brasileira, `config/profile.example.yml` já ativa `pt-BR` e
`modes/pt`. Existem dois caminhos para controlar isso:

### Caminho 1 -- Por sessão, via comando

Diga ao agente no início da sessão:

> "Use os modos em português de `modes/pt/`."

ou

> "Avaliações e candidaturas em português — use `modes/pt`."

O agente usa o overlay localizado quando ele existe e recorre ao modo-base em
`modes/` quando ainda não houver um arquivo localizado.

### Caminho 2 -- Permanente, via perfil

Adicione em `config/profile.yml` uma preferência de idioma:

```yaml
language:
  output: pt-BR
  modes_dir: modes/pt
```

`language.output` controla a língua da saída; `language.modes_dir` controla o
contexto de mercado. O roteador do skill resolve esses campos automaticamente.

## O que foi traduzido?

Os fluxos principais do mercado brasileiro estão cobertos:

| Arquivo | Traduzido de | Finalidade |
|---------|-------------|------------|
| `_shared.md` | `modes/_shared.md` (EN) | Contexto compartilhado, arquétipos, regras globais, especificidades do mercado BR |
| `oferta.md` | `modes/oferta.md` (ES) | Avaliação completa de uma vaga (Blocos A-F) |
| `aplicar.md` | `modes/apply.md` (EN) | Assistente ao vivo para formulários de candidatura |
| `apply.md` | entrada canônica | Compatibilidade do comando `apply` com `aplicar.md` |
| `pipeline.md` | `modes/pipeline.md` (ES) | Inbox de URLs / Second Brain para vagas acumuladas |
| `scan.md` | overlay de `modes/scan.md` | Fontes brasileiras, Gupy MCP e busca pública |
| `auto-pipeline.md` | overlay do modo-base | Avaliação completa com CLT/PJ e LGPD |
| `pdf.md` | overlay de `modes/pdf.md` | Currículo A4 em PT-BR e minimização de dados |
| `tracker.md` | overlay de `modes/tracker.md` | Vínculo, BRL, modalidade e cidade/UF |
| `remuneracao.md` | modo brasileiro | Comparação transparente de pacote CLT × PJ |

Os demais modos continuam funcionando por fallback para os originais. Esse
modelo reduz divergência: o overlay brasileiro acrescenta contexto local sem
copiar toda a lógica operacional do upstream.

## O que continua em inglês?

Propositalmente não traduzido, porque é vocabulário padrão de tech:

- `cv.md`, `pipeline`, `tracker`, `report`, `score`, `archetype`, `proof point`
- Nomes de tools (`Playwright`, `WebSearch`, `WebFetch`, `Read`, `Write`, `Edit`, `Bash`)
- Valores de status no tracker (`Evaluated`, `Applied`, `Interview`, `Offer`, `Rejected`)
- Code snippets, caminhos de arquivo, comandos

Os modos usam português tech brasileiro, como se fala em times de engenharia reais em São Paulo, Florianópolis ou Belo Horizonte: texto corrido em português, termos técnicos em inglês onde são de uso comum. Nada de traduzir "pipeline" para "tubulação" ou "cv.md" para "curriculo.md".

## Vocabulário de Referência

Se você for adaptar ou expandir os modos, siga este vocabulário para manter a consistência de tom:

| Inglês | Português BR (nesta codebase) |
|--------|-------------------------------|
| Job posting | Vaga / Descrição da vaga |
| Application | Candidatura |
| Cover letter | Carta de apresentação |
| Resume / CV | Currículo |
| Salary | Salário / Remuneração |
| Compensation | Remuneração |
| Skills | Habilidades / Competências |
| Interview | Entrevista |
| Hiring manager | Gestor da vaga / Hiring manager |
| Recruiter | Recrutador(a) |
| AI | IA (Inteligência Artificial) |
| Requirements | Requisitos |
| Career history | Trajetória profissional / Experiência |
| Notice period | Aviso prévio |
| Probation | Período de experiência |
| Vacation | Férias |
| 13th month salary | 13º salário |
| Formal employment (CLT) | CLT / Carteira assinada |
| Contractor (PJ) | PJ (Pessoa Jurídica) |
| Profit sharing | PLR (Participação nos Lucros e Resultados) |
| Health insurance | Plano de saúde |
| Meal voucher | Vale-refeição / Vale-alimentação |
| Severance fund | FGTS (Fundo de Garantia) |
| Stock options | Stock options (termo já usado em PT-BR) |

## Contribuir

Se quiser melhorar uma tradução ou traduzir um modo adicional:

1. Abra uma issue com a proposta (conforme `CONTRIBUTING.md`)
2. Siga o vocabulário acima para manter o tom consistente
3. Traduza de forma natural e idiomática — nada de tradução literal palavra por palavra
4. Mantenha os elementos estruturais (Bloco A-F, tabelas, blocos de código, instruções de tools) exatamente iguais
5. Teste com uma vaga real brasileira (ex: do Gupy ou LinkedIn BR) antes de abrir o PR

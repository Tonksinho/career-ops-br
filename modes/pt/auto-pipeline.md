# Auto-pipeline — mercado brasileiro

Leia primeiro `modes/auto-pipeline.md` e execute o fluxo completo com
`modes/pt/_shared.md` e `modes/pt/oferta.md` como contexto de mercado.

- Produza toda a saída em `pt-BR`, salvo pedido explícito em outro idioma.
- Identifique CLT, PJ, cooperado, estágio e vínculo não informado.
- Normalize valores para BRL mensal e anual sem inventar câmbio ou benefícios.
- Quando houver números suficientes, use `node br-compensation.mjs` para uma
  comparação transparente de CLT × PJ.
- Aponte campos potencialmente excessivos à luz da LGPD, mas não faça afirmação
  jurídica definitiva.
- Preserve todas as travas do modo-base: liveness, blacklist, score mínimo,
  revisão humana e proibição de envio automático.

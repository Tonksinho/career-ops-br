// The cost-honesty taxonomy — a single source for the FREE vs $ boundary that the
// Explorer teaches by repetition. Discovery (finding roles) is structurally free:
// it calls no LLM. Only evaluation (scoring a role against your CV) spends tokens,
// and only when the user chooses it. The framing is always local-first: "your key,
// your AI, your machine."

export type CostClass = "free" | "free-network" | "spend" | "free-gemini";

export const COST_META: Record<CostClass, { label: string; tip: string }> = {
  "free-network": {
    label: "Grátis",
    tip: "Pesquisa a rede pública de ATS por HTTP. Sem IA, sem tokens e sem envio de dados; nada é salvo até você adicionar uma vaga.",
  },
  free: {
    label: "Grátis",
    tip: "Sem tokens. Apenas lê ou grava arquivos locais.",
  },
  spend: {
    label: "Usa tokens",
    tip: "Executa uma avaliação real na sua própria IA. Só consome tokens quando você escolhe uma vaga.",
  },
  "free-gemini": {
    label: "Grátis · Gemini",
    tip: "Avalia usando a camada gratuita do Gemini, sem custo de tokens.",
  },
};

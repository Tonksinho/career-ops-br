import { ChevronDown, ExternalLink } from "lucide-react";

// Transparency = our differentiator ("why it's a 4.0 for YOU"). The wording is
// the CANONICAL public text from career-ops.org/methodology + /docs — rendered
// verbatim, NOT a web reinterpretation of the rubric (whose weights live in the
// core, modes/_shared.md). Native <details> → no client JS.

const DIMENSIONS: [string, string][] = [
  ["Compatibilidade", "o quanto seu currículo atende aos requisitos da vaga"],
  ["Alinhamento de carreira", "o quanto a vaga aproxima você do seu objetivo profissional"],
  ["Remuneração", "a proposta comparada ao mercado; quando faltam dados, o sistema não inventa valores"],
  ["Sinais culturais", "equipe, valores e formas de trabalho indicadas na vaga"],
  ["Alertas", "riscos de vaga fantasma, fraude ou incompatibilidade"],
  ["Nota geral", "a avaliação consolidada de todas as dimensões"],
];

const BLOCKS: [string, string][] = [
  ["A", "Resumo direto da vaga"],
  ["B", "Compatibilidade entre o currículo e cada requisito, incluindo lacunas"],
  ["C", "Estratégia de posicionamento para a vaga"],
  ["D", "Pesquisa de remuneração e comparação com o mercado"],
  ["E", "Personalização da candidatura"],
  ["F", "Preparação para entrevista com histórias STAR adequadas à vaga"],
  ["G", "Legitimidade do anúncio e sinais de fraude ou vaga fantasma"],
];

export function ScoreMethodology() {
  return (
    <details className="group mt-10 overflow-hidden rounded-2xl border border-border bg-surface/30">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors hover:bg-surface-hover">
        Como o career-ops calculou esta nota — e por que ela é específica para <span className="text-landing">você</span>
        <ChevronDown className="ml-auto size-4 text-faint transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-5 border-t border-border px-5 py-4 text-sm">
        <p className="text-muted">
          Cada vaga recebe uma nota de <strong className="text-foreground">1,0 a 5,0</strong> em seis dimensões.{" "}
          <strong className="text-brand">4,0</strong> é o corte recomendado para candidatura; abaixo disso, o
          career-ops normalmente recomenda não prosseguir.
        </p>
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-faint">As seis dimensões</div>
          <ul className="space-y-1.5">
            {DIMENSIONS.map(([k, v]) => (
              <li key={k}>
                <span className="font-medium text-foreground">{k}</span> <span className="text-muted">— {v}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-faint">O que significa cada bloco do relatório</div>
          <ul className="space-y-2">
            {BLOCKS.map(([k, v]) => (
              <li key={k} className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded bg-brand-soft text-xs font-semibold text-brand">
                  {k}
                </span>
                <span className="text-muted">{v}</span>
              </li>
            ))}
          </ul>
        </div>
        <a
          href="https://career-ops.org/methodology"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-brand transition-colors hover:underline"
        >
          Metodologia completa <ExternalLink className="size-3" />
        </a>
      </div>
    </details>
  );
}

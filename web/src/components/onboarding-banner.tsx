"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, X, Settings } from "lucide-react";

type Doctor = { available: boolean; onboardingNeeded: boolean; missing: string[]; warnings: string[] };

function hasCli(): boolean {
  try {
    return !!JSON.parse(localStorage.getItem("career-ops:config") || "{}").cliId;
  } catch {
    return false;
  }
}

const LABELS: Record<string, string> = {
  "cv.md": "seu currículo",
  "config/profile.yml": "seu perfil — cargos-alvo, remuneração e localização",
  "modes/_profile.md": "suas preferências",
  "portals.yml": "as empresas e portais para buscar",
};

// Detect (via the core's doctor.mjs) whether setup is incomplete, and offer to
// finish it CONVERSATIONALLY — the assistant asks in plain language and writes
// the canonical files (no YAML to edit). This is the #1 adoption barrier.
export function OnboardingBanner() {
  const [d, setD] = useState<Doctor | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [cli, setCli] = useState(true); // assume until read (avoid CTA flash)

  useEffect(() => {
    setCli(hasCli());
    fetch("/api/doctor")
      .then((r) => r.json())
      .then(setD)
      .catch(() => {});
  }, []);

  if (dismissed || !d || !d.onboardingNeeded) return null;
  const items = d.missing.map((m) => LABELS[m] ?? m);
  const kickoff =
    `Ajude-me a concluir a configuração do career-ops. Ainda preciso adicionar ${items.join(", ")}. Faça somente essas etapas em português brasileiro, de forma conversacional, e grave os arquivos para mim. Não pergunte novamente o que já estiver configurado.`;

  return (
    <div className="dot-bg relative mb-6 overflow-hidden rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 via-surface/40 to-transparent p-5">
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-3 text-faint transition-colors hover:text-foreground"
        aria-label="Fechar aviso"
      >
        <X className="size-4" />
      </button>
      <h2 className="font-display text-xl text-landing">Vamos concluir sua configuração</h2>
      <p className="mt-1.5 max-w-xl text-sm text-muted">
        O career-ops funciona melhor quando conhece seu perfil. Ainda precisamos de {items.join(", ")}.{" "}
        <span className="text-foreground">Você não precisa editar YAML</span>: responda em linguagem natural e o
        assistente prepara os arquivos.
      </p>
      {cli ? (
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("co-assistant", { detail: { message: kickoff } }))}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-200"
        >
          <Sparkles className="size-4" /> Configurar com o assistente
        </button>
      ) : (
        // The assistant needs a CLI to run — without one the kickoff would silently
        // drop. Send them to connect one first.
        <Link
          href="/config"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-200"
        >
          <Settings className="size-4" /> Conectar minha CLI de IA
        </Link>
      )}
    </div>
  );
}

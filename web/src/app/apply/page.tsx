import { Send } from "lucide-react";
import { ApplyView } from "@/components/apply-view";
import { ApplyBackdropMount } from "@/components/apply/apply-backdrop-mount";

export const dynamic = "force-dynamic";

export default function ApplyPage() {
  return (
    <div className="relative min-h-screen">
      {/* full-viewport blurred form wallpaper (behind everything) */}
      <ApplyBackdropMount />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-8">
        <div className="flex items-center gap-3">
          <Send className="size-6 text-brand" />
          <h1 className="font-display text-2xl tracking-tight text-landing">Candidatura</h1>
        </div>
        <p className="mt-1.5 max-w-xl text-sm text-muted">
          O career-ops lê o formulário real no seu computador e o apresenta aqui de forma simples, com respostas baseadas
          no seu currículo. Você revisa tudo; depois, o sistema preenche o formulário real e você mesmo faz o envio.
          O career-ops nunca envia uma candidatura por você.
        </p>
        <div className="mt-6">
          <ApplyView />
        </div>
      </div>
    </div>
  );
}

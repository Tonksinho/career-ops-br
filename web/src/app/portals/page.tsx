import { Radar } from "lucide-react";
import { PortalsView } from "@/components/portals-view";

export const dynamic = "force-dynamic";

export default function PortalsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="flex items-center gap-3">
        <Radar className="size-6 text-brand" />
        <h1 className="font-display text-2xl tracking-tight text-landing">Portais</h1>
      </div>
      <p className="mt-1.5 max-w-xl text-sm text-muted">
        Empresas que o career-ops monitora em busca de novas vagas. Execute uma verificação para identificar portais
        que deixaram de funcionar — um link quebrado faz a empresa desaparecer das buscas futuras.
      </p>
      <p className="mt-1.5 text-xs text-faint">
        Configurado em <code className="text-muted">portals.yml</code> — edite diretamente ou peça ao assistente.
      </p>
      <div className="mt-6">
        <PortalsView />
      </div>
    </div>
  );
}

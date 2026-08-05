import { LayoutDashboard, Compass, ListChecks, Send, Radar, BarChart3, FileText, Settings } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

// Single source of truth for the app's primary destinations — shared by the
// desktop sidebar and the mobile nav so they can never drift.
export type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  chip?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Hoje", icon: LayoutDashboard },
  { href: "/explore", label: "Explorar", icon: Compass, chip: "Novo" },
  { href: "/pipeline", label: "Pipeline", icon: ListChecks },
  { href: "/followups", label: "Acompanhamentos", icon: Send },
  { href: "/portals", label: "Portais", icon: Radar },
  { href: "/analytics", label: "Análises", icon: BarChart3 },
  { href: "/cv", label: "Currículo", icon: FileText },
  { href: "/config", label: "Configurações", icon: Settings },
];

export function isActivePath(href: string, pathname: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

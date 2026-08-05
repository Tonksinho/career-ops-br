import type { Metadata, Viewport } from "next";
import { inter, instrumentSerif, instrumentSerifItalic } from "@/lib/fonts";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "career-ops BR — sua central de carreira com IA",
  description: "A experiência web local do career-ops adaptada ao mercado brasileiro.",
  // Home-screen / standalone (iOS): let our theme-color flow up to the status bar
  // + Dynamic Island; safe-area insets handle the layout.
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "career-ops" },
};

export const viewport: Viewport = {
  // viewport-fit=cover → env(safe-area-inset-*) become non-zero so the header can
  // sit flush under the notch / Dynamic Island.
  viewportFit: "cover",
  // Default (corrected to the real theme before paint by THEME_SCRIPT, then kept
  // in sync by the theme toggle). Dark flows seamlessly into the black island.
  themeColor: "#0a0a0a",
};

// Before paint: set the theme class AND tint the browser chrome (theme-color) to
// match — so Safari's status bar / URL bar unify with the header instead of a
// jarring light seam. Matches --bg (light #f7f6f3 / dark #0a0a0a).
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('career-ops:theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');var m=document.querySelector('meta[name="theme-color"]');if(!m){m=document.createElement('meta');m.setAttribute('name','theme-color');document.head.appendChild(m);}m.setAttribute('content',d?'#0a0a0a':'#f7f6f3');}catch(e){document.documentElement.classList.add('dark');}})();`;

// One-time migration from the upstream first-installed default (usually
// Claude) to Codex. Future choices saved in Configurações keep version 1 and
// are therefore preserved.
const CLI_DEFAULT_SCRIPT = `(function(){try{var k='career-ops:config';var r=localStorage.getItem(k);var c=r?JSON.parse(r):{};if(c.cliDefaultVersion!==1){c.cliId='codex';c.cliDefaultVersion=1;localStorage.setItem(k,JSON.stringify(c));}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} ${instrumentSerifItalic.variable}`}
    >
      <body className="font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: CLI_DEFAULT_SCRIPT }} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

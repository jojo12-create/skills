import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { site } from '@/content/site';

const { meta, theme } = site;

export const metadata: Metadata = {
  // Remplacer par le domaine du client avant la mise en ligne (sert aux images de partage).
  metadataBase: new URL(meta.canonical || 'http://localhost:3000'),
  title: meta.title,
  description: meta.description,
  ...(meta.canonical ? { alternates: { canonical: meta.canonical } } : {}),
  openGraph: { type: 'website', title: meta.title, description: meta.description, images: [meta.shareImage] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
  other: { 'site-kind': 'other', 'page-type': 'service' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: theme.bg,
};

/** Les couleurs et polices du client, lues dans content/site.ts. */
const rootVars = `:root{
--p-bg:${theme.bg};--p-surface:${theme.surface};--p-ink:${theme.ink};--p-muted:${theme.muted};
--p-accent:${theme.accent};--p-accent-ink:${theme.accentInk};--p-action:${theme.accent};--p-action-ink:${theme.accentInk};
--p-inv-bg:${theme.invBg};--p-inv-surface:${theme.invSurface};--p-inv-ink:${theme.invInk};--p-inv-muted:${theme.invMuted};
--p-inv-accent:${theme.accent};--p-inv-accent-ink:${theme.accentInk};--p-inv-action:${theme.accent};--p-inv-action-ink:${theme.accentInk};
--font-display:${theme.fontDisplay};--font-text:${theme.fontText};
--display-weight:400;--display-tracking:${theme.displayTracking};--display-tracking-xl:${theme.displayTrackingXl};
}`;

/* L'entrée du héros (assets/motion) et la garde des « moments » animés : posées avant le premier rendu. */
const bootScript =
  "document.documentElement.classList.add('m-enter','mo-js');" +
  "setTimeout(function(){document.documentElement.classList.add('m-enter-done')},700);" +
  "setTimeout(function(){document.documentElement.classList.add('mo-safe')},2500);";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang={meta.lang} data-type="service" data-radius={theme.radius} data-buttons={theme.buttons} data-motion="">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={theme.fontsHref} />
        <link rel="stylesheet" href="/assets/system.css" />
        <link rel="stylesheet" href="/assets/ui/cards.css" />
        <link rel="stylesheet" href="/assets/motion/motion.css" />
        <link rel="stylesheet" href="/assets/layout/layout.css" />
        <link rel="stylesheet" href="/assets/icons/icon.css" />
        <link rel="stylesheet" href="/assets/diagrams/diagram.css" />
        <style dangerouslySetInnerHTML={{ __html: rootVars }} />
        <link rel="stylesheet" href="/assets/site.css" />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="modulepreload" href="/assets/moments/moments.js" />
        <link rel="modulepreload" href="/assets/moments/lib.js" />
        <link rel="modulepreload" href="/assets/moments/word-highlight/moment.js" />
      </head>
      <body>
        {children}
        {/* Navigation, formulaires, survols, entrée du héros et moments : scripts du kit, sans code maison.
            Chargés après l'hydratation de React, sinon React efface ce qu'ils ont modifié dans la page. */}
        <Script type="module" src="/assets/system.js" strategy="afterInteractive" />
        <Script type="module" src="/assets/motion/motion.js" strategy="afterInteractive" />
        <Script type="module" src="/assets/layout/layout.js" strategy="afterInteractive" />
        <Script type="module" src="/assets/diagrams/mount.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

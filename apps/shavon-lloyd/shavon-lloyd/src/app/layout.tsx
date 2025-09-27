import './global.css';
import Script from 'next/script';
import { SettingsProvider, PanelProvider, PreloaderVideo } from '@xulf/ui/shavon-lloyd';
import SEO from './SEO';

import {
  NavBar,
  NavBarMobile,
  NavWrapper,
  SettingsTab,
  MusicTab,
  Footer,
  Body,
  Tabs,
} from '@xulf/ui/shavon-lloyd';

import { Preloader } from '@xulf/ui/shavon-lloyd/'

export const metadata = {
  title: 'Shavon Lloyd – Composer & Educator',
  description: 'Explore performances, compositions, and educational work by Shavon Lloyd.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ldWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shavon Lloyd',
    url: 'https://shavonlloyd.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://shavonlloyd.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const priorityUrls = [
    "/hero-bg.webp",
    "/logo.webp",
  ];

  const otherUrls = [
    "/bio-hero.webp",
    "/btm-staff.webp",
    "/calendar-hero.webp",
    "/chev-left.webp",
    "/chev-right.webp",
    "/contact-hero.webp",
    "/favicon.ico",
    "/footer-placeholder.webp",
    "/shavon-portrait.webp",
    "/social-card.webp",
    "/title-text.svg",
    "/top-staff.webp",
    "/works-hero.webp",
  ];

  return (
    <html lang="en">
      <head>
        <SEO 
          title="Shavon Lloyd – Composer & Educator"
          description="Explore performances, compositions, and educational work by Shavon Lloyd."
          url="https://shavon-lloyd-six.vercel.app"
          image="https://shavon-lloyd-six.vercel.app/social-card.webp"
        />
      </head>
      <body>
        <Preloader priorityUrls={priorityUrls} otherUrls={otherUrls}>
          <SettingsProvider>
            <PanelProvider>
              <NavWrapper 
                desktop={<NavBar />}
                mobile={<NavBarMobile />}
                breakpoint={1088} // in pixels
              />
              <Body>
                {children}
              </Body>
              <Footer />
              {/* <Tabs
                gap={1}
              >
                <MusicTab playlistId="https://open.spotify.com/embed/playlist/06GGOttT4RqlE6ocEam8Cu?utm_source=generator" />
                <SettingsTab />
              </Tabs> */}
            </PanelProvider>
          </SettingsProvider>
          <Script id="ld-website" type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ldWebsite) }} />
        </Preloader>
      </body>
    </html>
  );
}
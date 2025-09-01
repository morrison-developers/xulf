import './global.css';
import Script from 'next/script';
import { SettingsProvider, PanelProvider } from '@xulf/ui/shavon-lloyd';

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

export const metadata = {
  title: 'Welcome to shavon-lloyd',
  description: '-',
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
  return (
    <html lang="en">
      <body>
        <SettingsProvider>
          <PanelProvider>
            <NavWrapper 
              desktop={<NavBar />}
              mobile={<NavBarMobile />}
              breakpoint={1024} // in pixels
            />
            <Body>
              {children}
            </Body>
            <Footer />
            <Tabs
              gap={1}
            >
              <MusicTab playlistId="https://open.spotify.com/embed/playlist/06GGOttT4RqlE6ocEam8Cu?utm_source=generator" />
              <SettingsTab />
            </Tabs>
          </PanelProvider>
        </SettingsProvider>
        <Script id="ld-website" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldWebsite) }} />
      </body>
    </html>
  );
}
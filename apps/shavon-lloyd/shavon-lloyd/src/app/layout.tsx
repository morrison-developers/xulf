import './global.css';
import Script from 'next/script';
import { SettingsProvider } from '../../../../../libs/ui/src/shavon-lloyd/(shared)/settings/SettingsContext';
import { PanelProvider } from '../../../../../libs/ui/src/shavon-lloyd/(shared)/panel/PanelController';

import {
  NavBar,
  SettingsTab,
  MusicTab,
  Footer,
  Body,
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
            <NavBar />
              <Body>
                {children}
              </Body>
            <SettingsTab />
            <MusicTab playlistId="https://open.spotify.com/embed/playlist/06GGOttT4RqlE6ocEam8Cu?utm_source=generator" />
            <Footer />
          </PanelProvider>
        </SettingsProvider>
        <Script id="ld-website" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldWebsite) }} />
      </body>
    </html>
  );
}
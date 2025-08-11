import './global.css';
import Script from 'next/script';
import NavBar from './components/NavBar/NavBar';
import { SettingsProvider } from './(shared)/settings/SettingsContext';
import SettingsTab from './components/SettingsTab/SettingsTab';

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
          <NavBar />
          {children}
          <SettingsTab />
        </SettingsProvider>
        <Script id="ld-website" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldWebsite) }} />
      </body>
    </html>
  );
}
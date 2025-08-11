// apps/shavon-lloyd/shavon-lloyd-app/src/app/layout.tsx
import './global.css';            // keep CSS imports here
import Providers from './providers';
import NavBar from './components/NavBar/NavBar';

export const metadata = {
  title: 'Shavon Lloyd',
  description: '…',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

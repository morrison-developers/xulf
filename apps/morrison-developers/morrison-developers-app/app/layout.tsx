import './global.css';
import { StyledComponentsRegistry } from './registry';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'Morrison Developers | Home',
  description: 'Morrison Developers Coming Soon',
  icons: {
    icon: '/icon_transparent.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <Analytics />
      </body>
    </html>
  );
}

import './global.css';
import { StyledComponentsRegistry } from './registry';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'Under Construction',
  description: 'Sweet Sye Coming Soon',
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

import './global.css';
import { StyledComponentsRegistry } from './registry';

export const metadata = {
  title: 'Sweet Sye Entertainment',
  description: 'The Homepage of Sweet Sye Entertainment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo@2x.webp" />
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

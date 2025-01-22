import './global.css';
import { StyledComponentsRegistry } from './registry';

export const metadata = {
  title: 'Page Under Construction',
  description: `Nicoletta Berry's personal portfolio`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon@0.5x.png" />
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

import './global.css';
import { StyledComponentsRegistry } from './registry';

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
      </body>
    </html>
  );
}

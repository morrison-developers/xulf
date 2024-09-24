import './global.css';

export const metadata = {
  title: 'Welcome To Morrison Developers',
  description: 'Morrison Developers, a custom software development company.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

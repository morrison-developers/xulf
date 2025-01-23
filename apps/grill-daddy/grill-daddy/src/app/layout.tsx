import './global.css';
import { StyledComponentsRegistry } from './registry';
import { GrillProvider } from './context/GrillContext';

export const metadata = {
  title: 'Grillio',
  description: 'Grillio is the ultimate grill management app designed to streamline your cooking process. Perfect for backyard chefs, it helps you track and coordinate cooking times for multiple items on the grill, ensuring everything is cooked to perfection and ready at the same time. With a dynamic timeline, state tracking, and precise timers, Grillio takes the guesswork out of grilling so you can focus on serving delicious meals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <GrillProvider>
        <StyledComponentsRegistry>
          <main>{children}</main>
        </StyledComponentsRegistry>
      </GrillProvider>
      </body>
    </html>
  );
}

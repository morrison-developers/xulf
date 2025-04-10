import ProtectedLayout from '../components/layouts/ProtectedLayout';

export default function OrgsLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}

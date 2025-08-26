import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register Page',
  description: 'Register Page Description',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

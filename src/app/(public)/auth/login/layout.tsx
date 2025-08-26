import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login Page',
  description: 'Login Page Description',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

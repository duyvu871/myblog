import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Student Management',
    default: 'Authentication | Student Management',
  },
  description: 'Đăng nhập hoặc đăng ký tài khoản Student Management System',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {children}
    </div>
  );
}

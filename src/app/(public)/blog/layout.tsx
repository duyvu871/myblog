import { BlogLayout } from 'app/components/layout/main-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BlogLayout>{children}</BlogLayout>;
}

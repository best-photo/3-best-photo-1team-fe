import MainLayout from '@/src/components/layout/MainLayout';

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainLayout>{children}</MainLayout>
    </>
  );
}

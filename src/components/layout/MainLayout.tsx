import GNB from './GNB/GNB';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GNB />
      <main className='pt-[60px] sm:pt-[70px] md:pt-[80px]'>{children}</main>
    </>
  );
}

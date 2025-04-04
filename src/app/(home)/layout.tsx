import AppFooter from '@/components/AppFooter';
import AppNavbar from '@/components/AppNavbar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col'>
      <AppNavbar />
      <div className='relative mt-24 grow'>{children}</div>
      <AppFooter />
    </div>
  );
}

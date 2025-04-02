import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='relative mt-24 grow'>{children}</div>
      <Footer />
    </div>
  );
}

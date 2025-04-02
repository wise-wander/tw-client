import Navbar from '@/components/navbar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='relative grow'>{children}</div>
    </div>
  );
}

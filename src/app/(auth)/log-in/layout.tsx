import AuthImage from '@/assets/AuthImage.jpeg';
import Image from 'next/image';

export default function LogInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative top-0 left-0 h-screen w-screen overflow-hidden'>
      <Image
        priority
        quality={100}
        src={AuthImage}
        alt='Golden Bridge'
        className='h-full w-full max-w-1/2 object-cover object-center'
      />
      <div className='absolute top-0 left-0 z-10 h-full w-full max-w-1/2 bg-black/30' />
      {children}
    </div>
  );
}

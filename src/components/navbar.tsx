import { NAVIGATION_ITEMS } from '@/constants/NavigationItems';
import { User } from 'lucide-react';
import Link from 'next/link';
import AppLogo from './AppLogo';
import MaxWidthContainer from './MaxWidthContainer';

export default function Navbar() {
  return (
    <nav className='fixed top-0 left-0 z-10 w-full shadow-md'>
      <div className='flex w-full flex-col bg-white'>
        <div className='w-full bg-base-200'>
          <MaxWidthContainer className='flex flex-row items-center space-x-1'>
            {NAVIGATION_ITEMS.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className='btn btn-ghost btn-sm'
              >
                {item.title}
              </Link>
            ))}
          </MaxWidthContainer>
        </div>
        <MaxWidthContainer className='flex flex-row items-center justify-between gap-4 py-2'>
          <AppLogo />
          <div className='flex flex-row space-x-2'>
            <Link href={'/log-in'} className='btn btn-outline btn-primary'>
              <User size={20} />
              Log in
            </Link>
            <Link href={'/register'} className='btn btn-primary'>
              Register
            </Link>
          </div>
        </MaxWidthContainer>
      </div>
    </nav>
  );
}

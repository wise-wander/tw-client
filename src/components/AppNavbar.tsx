'use client';

import { getMe } from '@/api/auth';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/api/constants';
import { NAVIGATION_ITEMS } from '@/constants/NavigationItems';
import { IUser } from '@/interfaces/IUser';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AppLogo from './AppLogo';
import MaxWidthContainer from './MaxWidthContainer';

export default function AppNavbar() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);

  async function me() {
    try {
      const response = await getMe();
      if (response.status === 200) {
        setUser(response.data);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  useEffect(() => {
    me();
  }, []);

  return (
    <nav className='fixed top-0 left-0 z-40 w-full shadow-md'>
      <div className='flex w-full flex-col bg-white'>
        <div className='w-full bg-base-300'>
          <MaxWidthContainer className='flex flex-row items-center space-x-1'>
            {NAVIGATION_ITEMS.map((item, index) => (
              <Link key={index} href={item.href} className='btn btn-ghost'>
                {item.title}
              </Link>
            ))}
          </MaxWidthContainer>
        </div>
        <MaxWidthContainer className='flex flex-row items-center justify-between gap-4 py-2'>
          <Link href='/' passHref>
            <AppLogo />
          </Link>
          {user ? (
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn avatar btn-circle btn-ghost'
              >
                <div className='w-10 rounded-full'>
                  <Image
                    src={'https://github.com/shadcn.png'}
                    alt="User's avatar"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className='dropdown-content menu z-1 mt-3 w-40 menu-md rounded-box bg-base-100 p-2 shadow'
              >
                <li>
                  <Link href='/account/profile'>Profile</Link>
                </li>
                <li className='text-red-500'>
                  <button onClick={() => clearTokens()}>Logout</button>
                </li>
              </ul>
            </div>
          ) : isLoading ? (
            <div className='h-10 w-[12rem] skeleton' />
          ) : (
            <>
              <div className='flex flex-row space-x-2'>
                <Link href='/sign-in' className='btn btn-outline btn-primary'>
                  Sign in
                </Link>
                <Link href='/sign-up' className='btn btn-soft btn-primary'>
                  Sign up
                </Link>
              </div>
            </>
          )}
        </MaxWidthContainer>
      </div>
    </nav>
  );
}

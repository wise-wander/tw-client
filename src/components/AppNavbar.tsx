'use client';

import request from '@/api';
import { AUTH_ROUTES } from '@/api/constants';
import { NAVIGATION_ITEMS } from '@/constants/NavigationItems';
import { IApiResponse } from '@/interfaces/IApiResponse';
import { IUser } from '@/interfaces/IUser';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AppLogo from './AppLogo';
import MaxWidthContainer from './MaxWidthContainer';

type IMe = Omit<IUser, 'is_admin'>;

export default function AppNavbar() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IMe | null>(null);

  async function me() {
    try {
      const response = await request.get<IApiResponse<IMe>>(AUTH_ROUTES.ME);
      if (response.data.status === 200) {
        setUser(response.data.data);
      } else {
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function logout(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const response = await request.post<IApiResponse<null>>(AUTH_ROUTES.LOGOUT);
    if (response.data.status === 200) {
      window.location.reload();
    } else {
      toast.error(response.data.message);
    }
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
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : isLoading ? (
            <div className='h-10 w-[12rem] skeleton' />
          ) : (
            <>
              <div className='flex flex-row space-x-2'>
                <Link href={'/log-in'} className='btn btn-outline btn-primary'>
                  Log in
                </Link>
                <Link href={'/register'} className='btn btn-soft btn-primary'>
                  Register
                </Link>
              </div>
            </>
          )}
        </MaxWidthContainer>
      </div>
    </nav>
  );
}

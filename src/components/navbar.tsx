'use client';

import request from '@/api';
import { NAVIGATION_ITEMS } from '@/constants/NavigationItems';
import { IApiResponse } from '@/interfaces/IApiResponse';
import { IUser } from '@/interfaces/IUser';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AppLogo from './AppLogo';
import MaxWidthContainer from './MaxWidthContainer';

type IMe = Omit<IUser, 'is_admin'>;

export default function Navbar() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IMe | null>(null);

  async function getMe() {
    try {
      const response = await request.get<IApiResponse<IMe>>(`/auth/me`);
      if (response.data.status === 200) {
        setUser(response.data.data);
      } else {
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <nav className='fixed top-0 left-0 z-40 w-full shadow-md'>
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
          {user ? (
            <div className='avatar avatar-placeholder'>
              <div className='w-10 rounded-full bg-accent text-accent-content'>
                <User />
              </div>
            </div>
          ) : isLoading ? (
            <div className='h-10 w-[220px] skeleton' />
          ) : (
            <>
              <div className='flex flex-row space-x-2'>
                <Link href={'/log-in'} className='btn btn-outline btn-primary'>
                  <User size={20} />
                  Log in
                </Link>
                <Link href={'/register'} className='btn btn-primary'>
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

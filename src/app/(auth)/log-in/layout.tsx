'use client';

import LoginImage from '@/assets/LoginImage.jpg';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LogInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', stiffness: 50 }}
        className='absolute top-0 left-0 h-full w-full max-w-1/2'
      >
        <Image
          priority
          quality={100}
          layout='fill'
          objectFit='cover'
          src={LoginImage}
          alt='Golden Bridge'
        />
      </motion.div>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', stiffness: 50 }}
        className='absolute top-0 left-0 z-10 h-full w-full max-w-1/2 bg-black/30'
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', stiffness: 50 }}
        className='absolute top-0 right-0 z-20 h-screen w-full bg-white shadow-md shadow-white md:max-w-1/2'
      >
        {children}
      </motion.div>
    </div>
  );
}

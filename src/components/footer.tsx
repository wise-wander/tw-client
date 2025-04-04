'use client';

import { NAVIGATION_ITEMS } from '@/constants/NavigationItems';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FacebookIcon from './icons/FacebookIcon';
import XSocialIcon from './icons/SocialXIcon';
import YoutubeIcon from './icons/YoutubeIcon';

export default function Footer() {
  return (
    <footer className='footer-center mt-10 footer footer-horizontal rounded bg-base-200 p-10 text-base-content'>
      <div className='grid grid-flow-col gap-4'>
        {NAVIGATION_ITEMS.map((item, index) => (
          <Link key={index} href={item.href} className='link link-hover'>
            {item.title}
          </Link>
        ))}
      </div>
      <div className='grid grid-flow-col gap-4'>
        <motion.button className='btn btn-square btn-ghost'>
          <FacebookIcon className='size-10' />
        </motion.button>
        <motion.button className='btn btn-square btn-ghost'>
          <YoutubeIcon className='size-10' />
        </motion.button>
        <motion.button className='btn btn-square btn-ghost'>
          <XSocialIcon className='size-10' />
        </motion.button>
      </div>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          TripWise
        </p>
      </aside>
    </footer>
  );
}

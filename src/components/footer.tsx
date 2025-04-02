import { NAVIGATION_ITEMS } from '@/constants/navigations';
import Link from 'next/link';
import FacebookIcon from './icons/facebook-icon';
import XSocialIcon from './icons/social-x-icon';
import YoutubeIcon from './icons/youtube-icon';

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
        <FacebookIcon className='size-10' />
        <YoutubeIcon className='size-10' />
        <XSocialIcon className='size-10' />
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

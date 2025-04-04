'use client';

import AppLogo from './AppLogo';
import FacebookIcon from './icons/FacebookIcon';
import XSocialIcon from './icons/SocialXIcon';
import YoutubeIcon from './icons/YoutubeIcon';

export default function Footer() {
  return (
    <footer className='footer-center mt-20 footer footer-horizontal bg-neutral p-10 text-neutral-content'>
      <aside>
        <AppLogo />
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav>
        <div className='grid grid-flow-col gap-4'>
          <XSocialIcon className='size-12' />
          <YoutubeIcon className='size-12' />
          <FacebookIcon className='size-12' />
        </div>
      </nav>
    </footer>
  );
}

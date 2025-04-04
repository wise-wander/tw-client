'use client';

import AppLogo from './AppLogo';

export default function AppFooter() {
  return (
    <footer className='footer-center mt-20 footer footer-horizontal bg-neutral p-10 text-neutral-content'>
      <aside>
        <AppLogo />
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
}

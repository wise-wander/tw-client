import { Open_Sans, Roboto_Mono } from 'next/font/google';

export const fontSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

export const fontMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

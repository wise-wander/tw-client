import { Roboto, Roboto_Mono } from 'next/font/google';

export const fontSans = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin'],
});

export const fontMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

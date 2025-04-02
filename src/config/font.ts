import { Poppins, Roboto_Mono } from 'next/font/google';

export const fontSans = Poppins({
  variable: '--font-poppins-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const fontMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

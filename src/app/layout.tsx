import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const baskinRobbinsBold = localFont({
  src: './fonts/BaskinRobbins-Bold.woff',
  weight: '400',
  variable: '--font-baskin-robbins',
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '700'], // light, regular, bold
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: '최애의 포토',
  description: '최애의 포토에 오신 것을 환영합니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body
        className={`${notoSansKr.variable} ${baskinRobbinsBold.variable} antialiased flex flex-col min-h-screen `}
      >
        <div className='custom-scroll'>{children}</div>
      </body>
    </html>
  );
}

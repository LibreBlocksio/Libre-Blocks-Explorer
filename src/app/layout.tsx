import { Inter as FontSans } from 'next/font/google';
import '@/styles/globals.css';
import clsx from 'clsx';
import Header from '@/components/header';
import Footer from '@/components/footer';
import GlobalQueryProvider from '@/components/providers/global';
import GlobalComponents from '@/components/global-components';
import Announcement from '@/components/announcement';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

/** @type {import("next").Metadata} */
export const metadata = {
  title: {
    default: 'Libre Blockchain Explorer',
    template: '%s | Libre Blockchain Explorer',
  },
  description:
    'Explore transactions, blocks, account for the Libre Blockchain.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={clsx(fontSans.variable)}>
      <body className='min-h-screen text-shade-900 antialiased'>
        <GlobalComponents />
        <Announcement />

        <GlobalQueryProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </GlobalQueryProvider>
      </body>
    </html>
  );
}

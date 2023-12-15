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

      <meta name="description" content="Explore transactions, blocks, account for the Libre Blockchain." />


      <meta property="og:url" content="https://libreblocks.io/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Libre Blockchain Explorer" />
      <meta property="og:description" content="Explore transactions, blocks, account for the Libre Blockchain." />
      <meta property="og:image" content="/images/og.png" />


      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="libreblocks.io" />
      <meta property="twitter:url" content="https://libreblocks.io/" />
      <meta name="twitter:title" content="Libre Blockchain Explorer" />
      <meta name="twitter:description" content="Explore transactions, blocks, account for the Libre Blockchain." />
      <meta name="twitter:image" content="" />



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

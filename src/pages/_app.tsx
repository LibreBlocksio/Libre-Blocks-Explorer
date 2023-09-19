import { Inter as FontSans } from '@next/font/google';
import ReactGA from 'react-ga4';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import DefaultLayout from '@/layouts/default';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import Seo from '@/components/seo';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const queryClient = new QueryClient();

dayjs.extend(utc);
dayjs.extend(relativeTime);

export default function App({ Component, pageProps }: AppProps) {
  ReactGA.initialize('G-NE6L1NPFCJ');
  return (
    <>
      {/* Required so we can use the font in the global scope and create a variable in Tailwind */}

      <style jsx global>{`
        :root {
          --font-inter: ${fontSans.style.fontFamily};
        }
      `}</style>

      <Seo />
      <QueryClientProvider client={queryClient}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </QueryClientProvider>
    </>
  );
}

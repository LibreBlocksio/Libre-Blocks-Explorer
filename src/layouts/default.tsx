import * as React from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import Hero from '@/components/hero';

type Props = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
  return (
    <div className='min-h-screen bg-black font-sans text-white antialiased'>
      <Header />
      <main>
        <Hero />
        {children}
      </main>
      <Footer />
    </div>
  );
}

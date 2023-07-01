import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { AlignRight, X } from 'lucide-react';

import { StyledIconButton, StyledLinkButton } from '@/components/button';

const links = [
  {
    url: '/',
    label: 'Home',
  },
  {
    url: 'https://ordinals.libre.org/',
    label: 'Ordinals',
    badge: 'coming soon!',
  },
  {
    url: 'https://defi.libre.org/',
    label: 'DeFi',
    badge: 'new',
  },
  {
    url: '/blockchain',
    label: 'Blockchain',
  },
  {
    url: '/validators',
    label: 'Validators',
  },
  {
    url: '/tokens',
    label: 'Tokens',
  },
];

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const dynamicRoute = router.asPath;

  React.useEffect(() => {
    // close menu on page change
    setOpen(() => false);
  }, [dynamicRoute]);

  return (
    <>
      <header className='border-b border-line'>
        <div className='container'>
          <div className='flex h-18 items-center justify-between'>
            <Link href='/' className='shrink-0'>
              <img src='/images/logo.svg' alt='Logo' width={270} height={41} />
            </Link>

            <div className='hidden h-full space-x-9 lg:flex'>
              {links.map((item, i) => (
                <Link
                  key={i}
                  href={item.url}
                  className={clsx(
                    'flex items-center border-b-3 text-base font-medium tracking-wide',
                    {
                      'border-primary text-primary': router.pathname === item.url,
                      'border-transparent text-white': router.pathname !== item.url,
                    }
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <span className='relative ml-1 rounded bg-primary px-1 py-1 text-xs text-white'>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className='lg:hidden'>
              <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger asChild>
                  <StyledIconButton aria-label='Open Menu'>
                    <AlignRight className='h-6 w-6 text-white' />
                  </StyledIconButton>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Content className='fixed inset-0 z-50 bg-black bg-opacity-90 px-3 backdrop-blur-sm'>
                    <div className='flex h-18 items-center justify-between'>
                      <Link href='/' className='shrink-0'>
                        <img src='/images/logo.svg' alt='Logo' width={208} height={41} />
                      </Link>
                      <Dialog.Close asChild>
                        <StyledIconButton aria-label='Close Menu'>
                          <X className='h-6 w-6 text-white' />
                        </StyledIconButton>
                      </Dialog.Close>
                    </div>
                    <div>
                      {links.map((item, i) => (
                        <StyledLinkButton LinkComponent={Link} key={i} href={item.url}>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className={clsx(
                              'block w-full p-3 text-right text-base font-medium tracking-wide',
                              {
                                'text-primary': router.pathname === item.url,
                                'text-white': router.pathname !== item.url,
                              }
                            )}
                          >
                            {item.label}
                            {item.badge && (
                              <span className='relative ml-1 rounded bg-primary px-1 py-1 text-xs text-white'>
                                New
                              </span>
                            )}
                          </motion.span>
                        </StyledLinkButton>
                      ))}
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

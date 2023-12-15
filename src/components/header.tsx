'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { AlignRight } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Button from '@/components/button';
import API_URLS from '@/api-urls';
import HeaderSearch from './header-search';

const links = [
  {
    url: '/',
    label: 'Dashboard',
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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [selectedApiUrl, setSelectedApiUrl] = useLocalStorage(
    'apiUrl',
    API_URLS.find((k) => k.default)?.url
  );

  React.useEffect(() => {
    setOpen(() => false);
  }, [searchParams, pathname]);
  const providerLink = process.env.NEXT_PUBLIC_PROVIDER_LINK;
  const providerLogo = process.env.NEXT_PUBLIC_PROVIDER_LOGO;
  return (
    <>
      <header className='border-b border-shade-200'>
        <div className='container'>
          <div className='grid grid-cols-[auto,minmax(0,1fr),auto] items-center py-4 lg:h-24 lg:space-x-6 lg:py-0'>
            <div className="lg:shrink-0">
              <Link href='/' className='block'>
                <img
                  src='/images/logo.svg'
                  alt='Logo'
                  width={260}
                  height={42}
                  className='h-6 w-auto object-contain object-left sm:h-8 lg:h-auto'
                />
              </Link>
              <Link href={process.env.NEXT_PUBLIC_PROVIDER_LINK as string} className="flex items-center space-x-1 text-sm font-medium justify-end">
                <span>Provided by {process.env.NEXT_PUBLIC_PROVIDERBY}</span>
                <img
                  src={process.env.NEXT_PUBLIC_PROVIDER_LOGO}
                  alt='Logo'
                  width={24}
                  height={24}
                  className='h-6 w-6 rounded-full'
                />
              </Link>
            </div>

            <HeaderSearch className='col-start-1 col-end-[-1] row-start-2 row-end-3 mt-5 lg:col-start-auto lg:col-end-auto lg:row-start-auto lg:row-end-auto lg:mt-0' />

            <div className='hidden h-full min-w-0 items-center space-x-6 lg:flex'>
              {links.map((item, i) => (
                <Link
                  key={i}
                  href={item.url}
                  className={clsx(
                    'font-medium text-shade-900 transition hover:text-opacity-70',
                    {
                      underline: pathname === item.url,
                    }
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button suppressHydrationWarning>
                    {
                      API_URLS.find((apiUrl) => apiUrl.url === selectedApiUrl)
                        ?.label
                    }
                  </Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className='w-40 rounded-md border border-shade-200 bg-white py-1 text-shade-900 animate-in fade-in-20'
                    sideOffset={5}
                    align='end'
                  >
                    {API_URLS.map((apiUrl) => (
                      <DropdownMenu.Item asChild key={apiUrl.key}>
                        <button
                          onClick={() => {
                            setSelectedApiUrl(apiUrl.url);
                            setTimeout(() => {
                              window.location.reload();
                            }, 150);
                          }}
                          className='flex w-full items-center justify-between space-x-3 px-4 py-1 text-left text-sm outline-none transition hover:bg-white/10'
                        >
                          <span>{apiUrl.label}</span>
                          {apiUrl.url === selectedApiUrl && (
                            <span className='block h-2 w-2 shrink-0 rounded-full bg-green-500'></span>
                          )}
                        </button>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>

            <div className='ml-auto flex min-w-0 items-center space-x-2.5 lg:hidden'>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button suppressHydrationWarning>
                    {
                      API_URLS.find((apiUrl) => apiUrl.url === selectedApiUrl)
                        ?.label
                    }
                  </Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className='w-40 rounded-md border border-shade-200 bg-white py-1 text-shade-900 animate-in fade-in-20'
                    sideOffset={5}
                    align='end'
                  >
                    {API_URLS.map((apiUrl) => (
                      <DropdownMenu.Item asChild key={apiUrl.key}>
                        <button
                          onClick={() => {
                            setSelectedApiUrl(apiUrl.url);
                            setTimeout(() => {
                              window.location.reload();
                            }, 150);
                          }}
                          className='flex w-full items-center justify-between space-x-3 px-4 py-1 text-left text-sm outline-none transition hover:bg-shade-100'
                        >
                          <span>{apiUrl.label}</span>
                          {apiUrl.url === selectedApiUrl && (
                            <span className='block h-2 w-2 shrink-0 rounded-full bg-green-500'></span>
                          )}
                        </button>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

              <DropdownMenu.Root open={open} onOpenChange={setOpen}>
                <DropdownMenu.Trigger asChild>
                  <button className='flex h-10 w-10 items-center justify-center rounded-md border border-shade-300 transition hover:bg-shade-100'>
                    <AlignRight className='h-6 w-6 text-neutral-900' />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className='w-40 rounded-md border border-shade-200 bg-white py-1 text-shade-900 animate-in fade-in-20'
                    sideOffset={5}
                    align='end'
                  >
                    <div>
                      {links.map((item, i) => (
                        <Link
                          key={i}
                          href={item.url}
                          className={clsx(
                            'flex w-full items-center justify-between space-x-3 px-4 py-1 text-left text-sm outline-none transition hover:bg-shade-100',
                            {
                              'font-medium text-primary': pathname === item.url,
                              'text-shade-900': pathname !== item.url,
                            }
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

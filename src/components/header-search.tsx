'use client';

import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { Copy, Currency, Wallet } from 'lucide-react';
import IconSearch from '~/icons/icon-search.svg';
import { useHotkeys } from 'react-hotkeys-hook';

const SEARCH_BY_ENUMS = {
  ADDRESS: 'address',
  TX: 'tx',
  BLOCK: 'block',
} as const;

type SearchByValues = (typeof SEARCH_BY_ENUMS)[keyof typeof SEARCH_BY_ENUMS];

const SearchBar = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithRef<'input'>
>(
  (
    {
      placeholder = 'Search for wallet address, block or transaction',
      ...rest
    },
    ref
  ) => {
    return (
      <div className='group relative flex h-10 w-full items-center overflow-hidden rounded-lg bg-white pl-1'>
        <button
          className='flex h-9 w-9 shrink-0 items-center justify-center'
          aria-label='Search'
        >
          <IconSearch className='h-5 w-5 text-shade-400' />
        </button>
        <input
          ref={ref}
          type='text'
          className='peer h-full w-full border-none bg-transparent p-0 font-normal text-shade-900 focus:ring-0'
          {...rest}
        />
        <span className='pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 truncate pl-10 pr-2 text-shade-400 peer-focus:hidden'>
          {placeholder}
        </span>
        <div className='pointer-events-none absolute inset-0 rounded-lg border border-shade-200 transition peer-focus:border-shade-400'></div>
      </div>
    );
  }
);

const isBlock = (v: string): boolean => /^\d+$/.test(v);

const isTx = (v: string): boolean => v.length > 12 && !/^\d+$/.test(v);

function findOutSearchBy(value: string): SearchByValues | null {
  if (isBlock(value)) {
    return SEARCH_BY_ENUMS.BLOCK;
  } else if (isTx(value)) {
    return SEARCH_BY_ENUMS.TX;
  } else if (value !== '') {
    return SEARCH_BY_ENUMS.ADDRESS;
  } else {
    return null;
  }
}

export default function HeaderSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchBy, setSearchBy] = React.useState<SearchByValues | null>(null);

  React.useEffect(() => {
    const _searchBy = findOutSearchBy(searchTerm);
    setSearchBy(() => _searchBy);
  }, [searchTerm]);

  const handleSearch = (_searchTerm: string) => {
    const _searchBy = findOutSearchBy(_searchTerm);
    router.push(`/${_searchBy}/${_searchTerm}`);
    setSearchTerm(() => '');
  };

  useHotkeys('enter', () => handleSearch(searchTerm), [searchTerm], {
    enableOnFormTags: true,
  });

  return (
    <div className={clsx('flex w-full items-center space-x-2', className)}>
      <SearchBar
        value={searchTerm}
        onInput={(e: React.FormEvent<HTMLInputElement>) =>
          setSearchTerm(e.currentTarget.value.toLocaleLowerCase().trim())
        }
      />
      <div className='hidden w-[120px] shrink-0 items-center space-x-1.5 text-primary sm:flex'>
        {searchBy === SEARCH_BY_ENUMS.ADDRESS && (
          <>
            <Wallet className='h-5 w-5 shrink-0' />
            <span className='text-sm font-semibold'>Account</span>
          </>
        )}
        {searchBy === SEARCH_BY_ENUMS.TX && (
          <>
            <Currency className='h-5 w-5 shrink-0' />
            <span className='text-sm font-semibold'>Transactions</span>
          </>
        )}
        {searchBy === SEARCH_BY_ENUMS.BLOCK && (
          <>
            <Copy className='h-5 w-5 shrink-0' />
            <p className='text-sm font-semibold'>Blocks</p>
          </>
        )}
      </div>
    </div>
  );
}

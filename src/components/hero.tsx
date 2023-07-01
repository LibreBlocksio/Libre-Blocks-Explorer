import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Search } from '@mui/icons-material';
import { Copy, Currency, Wallet } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';

import { StyledIconButton } from '@/components/button';

const SEARCH_BY_ENUMS = {
  ADDRESS: 'address',
  TX: 'tx',
  BLOCK: 'block',
} as const;

type SearchByValues = (typeof SEARCH_BY_ENUMS)[keyof typeof SEARCH_BY_ENUMS];

const SearchBar = React.forwardRef<HTMLInputElement, React.ComponentPropsWithRef<'input'>>(
  ({ placeholder = 'Search for wallet address, block or transaction', ...rest }, ref) => {
    return (
      <div className='group relative flex h-12 w-full items-center overflow-hidden rounded bg-shade-900 pl-2'>
        <StyledIconButton aria-label='Search'>
          <Search />
        </StyledIconButton>
        <input
          ref={ref}
          type='text'
          placeholder={placeholder}
          className='peer h-full w-full border-none bg-transparent p-0 font-normal text-white placeholder:text-shade-500 focus:ring-0'
          {...rest}
        />
        <div className='pointer-events-none absolute inset-0 rounded-md border border-primary/40 transition group-hover:border-primary peer-focus:border-primary'></div>
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

export default function Hero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchBy, setSearchBy] = React.useState<SearchByValues | null>(null);

  React.useEffect(() => {
    const _searchBy = findOutSearchBy(searchTerm);
    setSearchBy(() => _searchBy);
  }, [searchTerm]);

  const handleSearch = (_searchTerm: string) => {
    const _searchBy = findOutSearchBy(_searchTerm);
    router.push({
      pathname: `/${_searchBy}/[searchTerm]`,
      query: { searchTerm: _searchTerm },
    });
    setSearchTerm(() => '');
  };

  useHotkeys('enter', () => handleSearch(searchTerm), [searchTerm], {
    enableOnFormTags: true,
  });

  const isGeneratePage = router.pathname.includes('generate');

  return (
    <div className='container'>
      {!isGeneratePage && (
        <>
          <div
            className='border-b border-shade-800 pb-12 pt-12 md:pb-18'

            /*  style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(255, 98, 0, 0.14) 0%, rgba(13, 13, 13, 0) 100%)',
      }} */
          >
            <div className='container'>
              <div className='text-center'>
                <h1 className='text-3xl font-semibold text-white sm:text-4.5xl'>
                  Libre Blockchain Explorer
                </h1>
                <p className='mt-2 text-sm text-shade-400 sm:text-base'>
                  Explore transactions, blocks, and valuable data for the Libre Blockchain.
                </p>
              </div>
              <div className='mt-4 flex justify-center'>
                <div className='w-full max-w-lg'>
                  <SearchBar
                    value={searchTerm}
                    onInput={(e: React.FormEvent<HTMLInputElement>) =>
                      setSearchTerm(e.currentTarget.value.toLocaleLowerCase().trim())
                    }
                  />
                  <div className='mt-2 flex items-center space-x-4 text-shade-500'>
                    <div className='flex items-center space-x-1.5'>
                      <Wallet
                        className={clsx('h-5 w-5', {
                          'text-primary': searchBy === SEARCH_BY_ENUMS.ADDRESS,
                        })}
                      />
                      <p
                        className={clsx('text-sm font-semibold', {
                          'text-white': searchBy === SEARCH_BY_ENUMS.ADDRESS,
                        })}
                      >
                        Account
                      </p>
                    </div>
                    <div className='flex items-center space-x-1.5'>
                      <Currency
                        className={clsx('h-5 w-5', {
                          'text-primary': searchBy === SEARCH_BY_ENUMS.TX,
                        })}
                      />
                      <p
                        className={clsx('text-sm font-semibold', {
                          'text-white': searchBy === SEARCH_BY_ENUMS.TX,
                        })}
                      >
                        Transactions
                      </p>
                    </div>
                    <div className='flex items-center space-x-1.5'>
                      <Copy
                        className={clsx('h-5 w-5', {
                          'text-primary': searchBy === SEARCH_BY_ENUMS.BLOCK,
                        })}
                      />
                      <p
                        className={clsx('text-sm font-semibold', {
                          'text-white': searchBy === SEARCH_BY_ENUMS.BLOCK,
                        })}
                      >
                        Blocks
                      </p>
                    </div>
                  </div>
                </div>
              </div>{' '}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

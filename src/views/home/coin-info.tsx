'use client';

import * as React from 'react';
import ImageLibre from '~/images/libre.svg';
import ImageLibreWhite from '~/images/libre-white.svg';

import { useCoinInfo, useExchangeRates } from '@/hooks/api';
import { currencyFormat, numberFormat } from '@/utils/number';
import Button from '@/components/button';

export default function CoinInfo() {
  const coinInfoQuery = useCoinInfo();
  const exchangeRatesQuery = useExchangeRates();

  if (coinInfoQuery.isLoading || exchangeRatesQuery.isLoading) {
    return <span>Loading...</span>;
  }

  if (coinInfoQuery.isError || exchangeRatesQuery.isError) {
    return (
      <span>
        Error:{' '}
        {coinInfoQuery.error?.message || exchangeRatesQuery.error?.message}
      </span>
    );
  }

  const { data } = coinInfoQuery;

  if (!data) {
    return null;
  }

  const libreData = data.find((item) => item.name === 'LIBRE')!;

  return (
    <div>
      <h4 className='mb-3 text-2xl font-semibold'>Coin Info</h4>
      <div className='rounded-xl border border-shade-200 bg-white p-5 text-base'>
        <div className='-mt-4 mb-5 flex flex-wrap items-center justify-between'>
          <div className='flex items-center space-x-2 pt-4'>
            <ImageLibre className='h-11 w-11 object-contain' />
            <div className='mr-2 text-4xl font-semibold'>LIBRE</div>
          </div>
          <div className='flex items-center pt-4'>
            <div className='flex items-center space-x-2'>
              <a
                href='https://www.coingecko.com/en/coins/libre'
                target='_blank'
                className='shrink-0'
              >
                <img
                  className='block h-9 w-9 object-contain'
                  src='\icons\coingecko.svg'
                />
              </a>
              <Button asChild>
                <a
                  href='https://dashboard.libre.org/swap'
                  target='_blank'
                >
                  <ImageLibreWhite className='mr-2 h-4 w-4' />
                  Buy $LIBRE
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between border-b border-shade-200 pb-2 pt-5'>
          <span className='font-medium text-shade-600'>Market Cap</span>
          <span className='font-bold'>
            {currencyFormat(libreData.marketCap)}
          </span>
        </div>
        <div className='flex items-center justify-between border-b border-shade-200 pb-2 pt-5'>
          <span className='font-medium text-shade-600'>Staked</span>
          <span className='font-bold text-primary'>
            {numberFormat(libreData.staked, 2)}%
          </span>
        </div>
        <div className='flex items-center justify-between border-b border-shade-200 pb-2 pt-5'>
          <span className='font-medium text-shade-600'>Circulating Supply</span>
          <span className='font-bold text-primary'>
            {numberFormat(libreData.supply, 2)}
          </span>
        </div>
        <div className='flex items-center justify-between border-b border-shade-200 pb-2 pt-5'>
          <span className='font-medium text-shade-600'>Total Supply</span>
          <span className='font-bold'>{numberFormat(10000000000)}</span>
        </div>
      </div>
    </div>
  );
}

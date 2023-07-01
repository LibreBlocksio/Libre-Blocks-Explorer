import * as React from 'react';
import IconCirculatingSupply from '~/icons/icon-circulating-supply.svg';
import IconMarketCap from '~/icons/icon-market-cap.svg';
import IconTotalSupply from '~/icons/icon-total-supply.svg';
import ImageLibre from '~/images/libre.svg';

import { useCoinInfo, useExchangeRates } from '@/hooks/api';
import { currencyFormat, numberFormat } from '@/utils/number';

export default function CoinInfo() {
  const coinInfoQuery = useCoinInfo();
  const exchangeRatesQuery = useExchangeRates();

  if (coinInfoQuery.isLoading || exchangeRatesQuery.isLoading) {
    return <span>Loading...</span>;
  }

  if (coinInfoQuery.isError || exchangeRatesQuery.isError) {
    return <span>Error: {coinInfoQuery.error?.message || exchangeRatesQuery.error?.message}</span>;
  }

  const libreData = coinInfoQuery.data.find((item) => item.name === 'LIBRE')!;

  return (
    <div>
      <h4 className='mb-4 text-xl font-semibold text-white'>Coin info</h4>
      <div className='divide-y divide-shade-800 rounded-xl border border-shade-800 bg-black text-base text-white'>
        <div className='flex items-center space-x-4 p-5'>
          <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-shade-800 bg-shade-900'>
            <ImageLibre className='h-6.5 w-6.5 object-contain' />
          </div>
          <div>
            <div className='flex items-center'>
              <div className='mr-2 text-2xl font-semibold'>LIBRE</div>
              <a href='https://www.coingecko.com/en/coins/libre' target='_blank'>
                <img
                  className='mr-2 h-7 transition-transform duration-300 hover:scale-110'
                  src='\icons\coingecko.svg'
                />
              </a>
              <a href='https://coinmarketcap.com/currencies/libre/' target='_blank'>
                <img
                  className='h-7 transition-transform duration-300 hover:scale-110'
                  src='\icons\coinmarketcap.svg'
                />
              </a>
            </div>

            <div className='font-semibold'>{currencyFormat(exchangeRatesQuery.data.LIBRE, 6)}</div>
          </div>
        </div>
        <div className='flex items-center justify-between px-5 py-4'>
          <div className='flex items-center space-x-3'>
            <IconMarketCap className='h-5 w-5 shrink-0 text-shade-400' />
            <span>Market Cap</span>
          </div>
          <span>{currencyFormat(libreData.marketCap)}</span>
        </div>
        <div className='flex items-center justify-between px-5 py-4'>
          <div className='flex items-center space-x-3'>
            <IconMarketCap className='h-5 w-5 shrink-0 text-shade-400' />
            <span>Staked</span>
          </div>
          <span>{numberFormat(libreData.staked, 2)}%</span>
        </div>
        <div className='flex items-center justify-between px-5 py-4'>
          <div className='flex items-center space-x-3'>
            <IconCirculatingSupply className='h-5 w-5 shrink-0 text-shade-400' />
            <span>Circulating Supply</span>
          </div>
          <span>{numberFormat(libreData.supply, 2)}</span>
        </div>
        <div className='flex items-center justify-between px-5 py-4'>
          <div className='flex items-center space-x-3'>
            <IconTotalSupply className='h-5 w-5 shrink-0 text-shade-400' />
            <span>Total Supply</span>
          </div>
          <span>{numberFormat(10000000000)}</span>
        </div>
      </div>
    </div>
  );
}

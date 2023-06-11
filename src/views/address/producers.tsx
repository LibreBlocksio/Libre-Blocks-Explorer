import { useExchangeRates } from '@/hooks/api';
import { currencyFormat } from '@/utils/number';
import Link from 'next/link';
import React, { useState } from 'react';
import type { ViewProps } from './types';

export default function AccountOverview({ accountData }: ViewProps) {
  const [showInfo, setShowInfo] = useState(false);

  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };

  return (
    <div className='mt-4 flex items-center'>
      {accountData.account?.voter_info?.producers?.[0] === null ||
      accountData.account?.voter_info?.producers?.[0] === undefined ? (
        <a
          className='relative flex items-center justify-center rounded-full  bg-blue-500 px-3 py-1 text-white'
          href='https://dashboard.libre.org/validators'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Please vote
        </a>
      ) : (
        <>
          <h4 className='font-md mr-2 text-lg text-white'>Voted Validator:</h4>
          <span className='relative flex items-center justify-center rounded-full bg-orange-500 px-3 py-1 text-white'>
            {accountData.account?.voter_info?.producers?.[0]}{' '}
          </span>
        </>
      )}

      {showInfo && (
        <div className='relative ml-2  rounded-full bg-orange-500 p-0  text-white'>
          <p className='font-sm ml-2 mr-2 '>+ You must LIBRE Stake </p>
        </div>
      )}
    </div>
  );
}

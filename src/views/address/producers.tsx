'use client';

import * as React from 'react';
import type { ViewProps } from './types';
import dayjs from 'dayjs';
import { useExchangeRates } from '@/hooks/api';

export default function AccountOverview({ accountData }: ViewProps) {
  const exchangeRatesQuery = useExchangeRates();
  const tokens = accountData.tokens;

  const totalValue = React.useMemo(() => {
    if (exchangeRatesQuery.isSuccess) {
      const exchangeRates = exchangeRatesQuery.data;
      let total = 0;

      tokens.forEach((token) => {
        const value = token.amount * exchangeRates[token.symbol];
        if (!isNaN(value)) {
          total += value;
        }
      });

      return `$${total.toLocaleString('en-US', { maximumFractionDigits: 3 })}`;
    }

    return 'Loading...';
  }, [exchangeRatesQuery.isSuccess, tokens]);

  const votingPower = Number.parseFloat(
    accountData.account?.voter_info?.staked
  ).toLocaleString('en-US', { maximumFractionDigits: 3 });
  const accountCreated = dayjs(accountData.account.created).fromNow();
  const votedFor = accountData.account?.voter_info?.producers;
  const totalActions = accountData.total_actions;

  return (
    <div>
      <div className='text-3xl font-bold'>Value: {totalValue}</div>
      <div className='mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2'>
        <div className='text-lg font-semibold'>
          Voting Power: {votingPower ?? '-'}
        </div>
        <div className='text-lg font-semibold'>
          Account Created: {accountCreated}
        </div>
        <div className='text-lg font-semibold'>
          Voted For: {votedFor ?? '-'}
        </div>
        <div className='text-lg font-semibold'>{totalActions} Transactions</div>
      </div>
    </div>
  );
}

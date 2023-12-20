'use client';

import * as React from 'react';
import type { ViewProps } from './types';
import dayjs from 'dayjs';
import {
  useAccountTokens,
  useExchangeRates,
  useOrdinalsMarketcap,
} from '@/hooks/api';

export default function AccountOverview({ accountData }: ViewProps) {
  const exchangeRatesQuery = useExchangeRates();
  const ordinalsMarketcapQuery = useOrdinalsMarketcap();
  const accountTokensQuery = useAccountTokens({
    account: accountData.account.account_name,
    limit: 999,
  });

  const totalValue = React.useMemo(() => {
    if (
      accountTokensQuery.isSuccess &&
      exchangeRatesQuery.isSuccess &&
      ordinalsMarketcapQuery.isSuccess
    ) {
      const exchangeRates = exchangeRatesQuery.data;
      const accountTokens = accountTokensQuery.data;
      const ordinalsMarketcap = ordinalsMarketcapQuery.data;
      const BTCPrice = exchangeRates.PBTC;

      const tokens = accountTokens?.tokens;

      const sortedTokens = (() => {
        if (!exchangeRates || !tokens) return false;

        const sorted = [...tokens].sort((a, b) => {
          const aValue = (a.amount || 0) * (exchangeRates[a.symbol] || 0);
          const bValue = (b.amount || 0) * (exchangeRates[b.symbol] || 0);
          if (isNaN(aValue)) return 1;
          if (isNaN(bValue)) return -1;
          return bValue - aValue;
        });

        const filtered = sorted.filter(
          (token) => token.contract !== 'ord.libre' && token.amount !== 0,
        );

        return filtered;
      })();

      if (!sortedTokens) return;

      const sumWithInitial = sortedTokens.reduce((accumulator, token) => {
        let toSum = 0;
        if (isNaN(token.amount * exchangeRates[token.symbol])) {
          toSum =
            token.amount *
            (ordinalsMarketcap.tokens.find((t) => t.mappedName === token.symbol)
              ?.price ?? 0) *
            BTCPrice;
        } else {
          toSum = token.amount * exchangeRates[token.symbol];
        }

        return accumulator + toSum;
      }, 0);

      const formattedSum = sumWithInitial.toLocaleString('en-US', {
        maximumFractionDigits: 3,
      });

      return formattedSum;
    }

    return 'Loading...';
  }, [
    accountTokensQuery.isSuccess,
    ordinalsMarketcapQuery.isSuccess,
    exchangeRatesQuery.isSuccess,
  ]);

  const votingPower = Number.parseFloat(
    accountData.account?.voter_info?.staked,
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

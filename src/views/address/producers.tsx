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
  const [showInfo, setShowInfo] = React.useState(false);
  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };

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

      const formattedSum = sumWithInitial.toLocaleString(undefined, {
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

  function formatNumber(number: number | bigint) {
    return new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 4,
    }).format(number);
  }

  const votingPowerRaw = accountData.account?.voter_info?.staked;
  const votingPower = votingPowerRaw !== null && votingPowerRaw !== undefined
    ? formatNumber(Number.parseFloat(votingPowerRaw))
    : '-';

  const accountCreated = dayjs(accountData.account.created).fromNow();
  const votedFor = accountData.account?.voter_info?.producers;
  const totalActions = accountData.total_actions;

  return (
    <div>
      <div className='text-3xl font-bold'>Value: ${totalValue}</div>
      <div className='mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2'>

        {!votedFor && votingPower === '-' ? (
          <>

            <div className='text-lg font-semibold sm:col-span-1 '>
              Vote Info:
              <a
                className='ml-2 inline-flex items-center justify-center rounded-full bg-[#4f4fde] px-3 py-1 text-white'
                href='https://dashboard.libre.org/validators'
              >
                Stake $LIBRE and Vote
              </a>
            </div>

            <div className='sm:col-span-1 gap-x-12 grid gap-y-6'>
              <div className='text-lg font-semibold'>
                Account Created: {accountCreated}
              </div>
              <div className='text-lg font-semibold'>
                {totalActions} Transactions
              </div>
            </div>
          </>
        ) : (
          <>

            <div className='text-lg font-semibold'>
              Voting Power: {votingPower}
            </div>
            <div className='text-lg font-semibold'>
              Voted For: {votedFor ? votedFor : '-'}
            </div>

            <div className='text-lg font-semibold'>
              Account Created: {accountCreated}
            </div>
            <div className='text-lg font-semibold'>
              {totalActions} Transactions
            </div>
          </>
        )}
      </div>
    </div>









  );
}

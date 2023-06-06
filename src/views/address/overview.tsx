import { useExchangeRates } from '@/hooks/api';
import { currencyFormat } from '@/utils/number';
import Link from 'next/link';
import type { OverviewProps } from './types';

export default function AccountOverview({ tokens }: OverviewProps) {
  const exchangeRatesQuery = useExchangeRates();

  if (exchangeRatesQuery.isLoading) {
    return <span>Loading...</span>;
  }

  if (exchangeRatesQuery.isError) {
    return <span>Error: {exchangeRatesQuery.error?.message}</span>;
  }

  const exchangeRates = exchangeRatesQuery.data;

  return (
    <div className='flex-1'>
      <h4 className='mb-4 text-xl font-semibold text-white'>Wallet Account Overview</h4>

      <div className='w-full overflow-x-auto rounded-md border border-shade-800 bg-shade-900'>
        <table className='custom-table'>
          <thead>
            <tr>
              <th>TOKEN</th>
              <th>BALANCE</th>
              <th>VALUE</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <tr key={token.symbol}>
                <td>
                  <div className='flex items-center space-x-4'>
                    <img
                      src={`/images/symbols/${token.symbol.toUpperCase()}.svg`}
                      alt=''
                      className='h-9 w-9 shrink-0'
                    />
                    <Link
                      href={'../tokens'}
                      className='inline-block max-w-full truncate align-middle  hover:underline'
                    >
                      <span>{token.symbol}</span>
                    </Link>
                  </div>
                </td>
                <td>{token?.amount ?? 0}</td>
                <td>
                  {isNaN(token.amount * exchangeRates[token.symbol]) ? (
                    <span style={{ color: 'gray' }}>SOON</span>
                  ) : (
                    <span style={{ color: 'white' }}>
                      ${' '}
                      {(token.amount * exchangeRates[token.symbol]).toLocaleString('en-US', {
                        maximumFractionDigits: 3,
                      })}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

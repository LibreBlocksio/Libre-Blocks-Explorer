'use client';

import {
  useAccountTokens,
  useExchangeRates,
  useOrdinalsMarketcap,
} from '@/hooks/api';
import type { OverviewProps } from './types';
import * as React from 'react';
import * as S from '@/styles/table';
import { Table, TableHead, TableRow } from '@mui/material';
import { motion } from 'framer-motion';
import CustomPagination from '@/components/custom-pagination';

const MotionTableRow = motion(TableRow);

export default function AccountOverview({ account }: OverviewProps) {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;
  const exchangeRatesQuery = useExchangeRates();
  const ordinalsMarketcapQuery = useOrdinalsMarketcap();
  const accountTokensQuery = useAccountTokens({ account, limit: 999 });
  const [totalValue, setTotalValue] = React.useState(0);

  const fetchData = () => {
    if (
      exchangeRatesQuery.isLoading ||
      ordinalsMarketcapQuery.isLoading ||
      accountTokensQuery.isLoading
    ) {
      return { loading: true };
    }

    if (
      exchangeRatesQuery.isError ||
      ordinalsMarketcapQuery.isError ||
      accountTokensQuery.isError
    ) {
      return {
        error:
          exchangeRatesQuery.error?.message +
          ' ' +
          ordinalsMarketcapQuery.error?.message,
      };
    }

    const exchangeRates = exchangeRatesQuery.data;
    const ordinalsMarketcap = ordinalsMarketcapQuery.data;
    const accountTokens = accountTokensQuery.data;

    return { exchangeRates, ordinalsMarketcap, accountTokens };
  };

  const dataResult = fetchData();
  const { exchangeRates, ordinalsMarketcap, accountTokens } = dataResult;
  const tokens = accountTokens?.tokens;

  const sortedTokens = React.useMemo(() => {
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
  }, [exchangeRates, tokens]);

  const visibleRows = React.useMemo(() => {
    if (!sortedTokens) return [];

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return sortedTokens.slice(startIndex, endIndex);
  }, [sortedTokens, page, rowsPerPage]);

  const BTCPrice = exchangeRatesQuery.data?.PBTC;

  React.useEffect(() => {
    if (exchangeRatesQuery.isSuccess) {
      const exchangeRates = exchangeRatesQuery.data;
      let total = 0;

      tokens?.forEach((token) => {
        const value = token.amount * exchangeRates[token.symbol];
        if (!isNaN(value)) {
          total += value;
        }
      });

      setTotalValue(total);
    }
  }, [exchangeRatesQuery.isSuccess, tokens]);

  if (dataResult.loading) {
    return <span>Loading...</span>;
  }

  if (dataResult.error) {
    return <span>Error: {dataResult.error}</span>;
  }

  return (
    <div className='flex-1'>
      <div className='mb-3 flex items-end justify-between'>
        <h4 className='mb-3 text-2xl font-semibold'>Tokens</h4>
      </div>
      <div className='bg-whtie w-full overflow-x-auto rounded-xl border border-shade-200 p-2'>
        <Table aria-label='Last Transactions'>
          <TableHead>
            <S.StyledTableRow>
              <S.StyledTableHeadCell size='medium'>Asset</S.StyledTableHeadCell>
              <S.StyledTableHeadCell size='medium'>
                Amount
              </S.StyledTableHeadCell>
              <S.StyledTableHeadCell size='medium'>
                USD Value
              </S.StyledTableHeadCell>
            </S.StyledTableRow>
          </TableHead>
          <S.StyledTableBody>
            {visibleRows.map((token) => (
              <MotionTableRow
                key={`${JSON.stringify(token)}`}
                layout
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: 'auto',
                  display: 'table-row',
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                  },
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  display: 'none',
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <S.StyledTableCell size='medium'>
                  <div className='flex items-center'>
                    <img
                      src={`/images/symbols/${token.symbol}.svg`}
                      alt={token.symbol}
                      className='h-15 w-15 mr-2 block shrink-0 object-contain'
                      onError={(e) => {
                        // @ts-ignore
                        if (e.target instanceof HTMLElement) {
                          e.target.style.display = 'none'; // SVG görüntüsünü gizle
                          const container = document.createElement('div');
                          container.className =
                            'flex items-center space-x-2 mr-2'; // İçeriği yatay hizalamak için flex kullanın
                          const textContainer = document.createElement('div');
                          textContainer.className =
                            'rounded-full w-8 h-8 bg-[#4F4FDE] flex items-center justify-center ';
                          textContainer.style.fontSize = '8px'; // Küçük font boyutu ayarlayın
                          textContainer.style.overflow = 'hidden'; // İçeriği kırp
                          textContainer.style.color = 'white'; // Metin rengini beyaz yapın
                          textContainer.innerText = token.symbol; // Token adını içeriğe ekleyin
                          container.appendChild(textContainer); // Yazıyı içeriğe ekleyin
                          if (e.target.parentNode) {
                            e.target.parentNode.insertBefore(
                              container,
                              e.target.nextSibling,
                            ); // İçeriği ekleyin
                          }
                        }
                      }}
                    />

                    <div className='flex items-center'>
                      <span className='font-semibold'>{token.symbol}</span>
                      {['PBTC', 'LIBRE', 'PUSDT', 'BTCLIB', 'BTCUSD'].includes(
                        token.symbol,
                      ) ? null : (
                        <div className='ml-2 rounded-full bg-[#4F4FDE] px-2 py-1 text-xs text-white'>
                          BRC20
                        </div>
                      )}
                    </div>
                  </div>
                </S.StyledTableCell>
                <S.StyledTableCell size='medium'>
                  {token?.amount ?? 0}
                </S.StyledTableCell>
                <S.StyledTableCell size='medium'>
                  {exchangeRates && ordinalsMarketcap && BTCPrice && (
                    <>
                      {isNaN(token.amount * exchangeRates[token.symbol]) ? (
                        <span>
                          $
                          {(
                            token.amount *
                            (ordinalsMarketcap.tokens.find(
                              (t) => t.mappedName === token.symbol,
                            )?.price ?? 0) *
                            BTCPrice
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      ) : (
                        <span>
                          $
                          {(
                            token.amount * exchangeRates[token.symbol]
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      )}
                    </>
                  )}
                </S.StyledTableCell>
              </MotionTableRow>
            ))}
          </S.StyledTableBody>
        </Table>
        <CustomPagination
          dataLength={sortedTokens ? sortedTokens?.length || 0 : 0}
          onPageChange={(value) => setPage(value)}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
}

'use client';

import * as React from 'react';
import { Table, TableHead, TableRow } from '@mui/material';
import * as S from '@/styles/table';
import { motion } from 'framer-motion';
import Loading from '@/components/loading';
import { useTokens } from '@/hooks/api';
const MotionTableRow = motion(TableRow);

export default function NormalTable() {
  const numberFormat = new Intl.NumberFormat('en-US', { style: 'decimal' });
  const producersQuery = useTokens();

  if (producersQuery.isLoading) {
    return <Loading />;
  }

  if (producersQuery.isError) {
    return (
      <div className='container py-20 text-center'>
        <div className='mt-10'>Error: {producersQuery.error?.message}</div>
      </div>
    );
  }

  const { data } = producersQuery;

  if (!data) {
    return null;
  }

  return (
    <div className='w-full overflow-x-auto rounded-md border border-shade-200 bg-white'>
      <Table aria-label='Tokens Table'>
        <TableHead>
          <S.StyledTableRow>
            <S.StyledTableHeadCell size='medium'>ICON</S.StyledTableHeadCell>
            {/* https://cdn.libre.org/icon-btc.svg */}
            <S.StyledTableHeadCell size='medium'>NAME</S.StyledTableHeadCell>
            {/* Bitcoin */}
            <S.StyledTableHeadCell size='medium'>SYMBOL</S.StyledTableHeadCell>
            {/* pBTC */}
            <S.StyledTableHeadCell size='medium'>
              MARKETCAP
            </S.StyledTableHeadCell>
            {/* pBTC */}
            <S.StyledTableHeadCell size='medium'>SUPPLY</S.StyledTableHeadCell>
            {/* 71.53 */}
          </S.StyledTableRow>
        </TableHead>
        <S.StyledTableBody>
          {data.map((row) => (
            <MotionTableRow
              key={`${JSON.stringify(row)}`}
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
                <img src={row.icon}></img>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <span className=''>
                  {' '}
                  {row.name === 'PBTC'
                    ? 'BITCOIN'
                    : row.name === 'PUSDT'
                    ? 'USDT'
                    : row.name === 'LIBRE'
                    ? 'LIBRE'
                    : '-'}
                </span>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <span className=''>{row.symbol}</span>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <span className=''>${numberFormat.format(row.marketCap)}</span>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <span className=''>{row.supply}</span>
              </S.StyledTableCell>
            </MotionTableRow>
          ))}
        </S.StyledTableBody>
      </Table>
    </div>
  );
}

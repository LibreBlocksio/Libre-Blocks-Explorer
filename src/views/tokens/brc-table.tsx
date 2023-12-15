'use client';

import * as React from 'react';
import { Table, TableHead, TableRow } from '@mui/material';
import * as S from '@/styles/table';
import { motion } from 'framer-motion';
import Loading from '@/components/loading';
import { useOrdinalsMarketcap } from '@/hooks/api';
const MotionTableRow = motion(TableRow);

export default function BrcTable() {
  const numberFormat = new Intl.NumberFormat('en-US', { style: 'decimal' });
  const ordinalsMarketcapQuery = useOrdinalsMarketcap();

  if (ordinalsMarketcapQuery.isLoading) {
    return <Loading />;
  }

  if (ordinalsMarketcapQuery.isError) {
    return (
      <div className='container py-20 text-center'>
        <div className='mt-10'>Error: {ordinalsMarketcapQuery.error?.message}</div>
      </div>
    );
  }

  const { data } = ordinalsMarketcapQuery;

  if (!data) {
    return null;
  }

  return (
    <div className='w-full overflow-x-auto rounded-md border border-shade-200 bg-white'>
      <Table aria-label='Tokens Table'>
        <TableHead>
          <S.StyledTableRow>
            <S.StyledTableHeadCell size='medium'>NAME</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>MARKETCAP</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>PRICE</S.StyledTableHeadCell>
          </S.StyledTableRow>
        </TableHead>
        <S.StyledTableBody>
          {data.tokens.map((row) => (
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
                {row.name}
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                ${numberFormat.format(row.marketCap)}
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                {row.price}
              </S.StyledTableCell>
            </MotionTableRow>
          ))}
        </S.StyledTableBody>
      </Table>
    </div>
  );
}

import * as React from 'react';
import { Table, TableHead, TableRow } from '@mui/material';
import * as S from '@/styles/table';
import { motion } from 'framer-motion';
import type { TokensTableProps } from './types';
import { numberFormat } from '@/utils/number';
import Link from 'next/link';
const MotionTableRow = motion(TableRow);

export default function TokensTable({ data }: TokensTableProps) {
  const numberFormat = new Intl.NumberFormat('en-US', { style: 'decimal' });

  return (
    <div className='w-full overflow-x-auto rounded-md border border-shade-800 bg-shade-900'>
      <Table aria-label='Tokens Table'>
        <TableHead>
          <S.StyledTableRow>
            <S.StyledTableHeadCell size='medium'>ICON</S.StyledTableHeadCell>{' '}
            {/* https://cdn.libre.org/icon-btc.svg */}
            <S.StyledTableHeadCell size='medium'>NAME</S.StyledTableHeadCell> {/* Bitcoin */}
            <S.StyledTableHeadCell size='medium'>SYMBOL</S.StyledTableHeadCell> {/* pBTC */}
            <S.StyledTableHeadCell size='medium'>MARKETCAP</S.StyledTableHeadCell> {/* pBTC */}
            <S.StyledTableHeadCell size='medium'>SUPPLY</S.StyledTableHeadCell> {/* 71.53 */}
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

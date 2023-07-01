import { useEffect, useState } from 'react';
import { Table, TableHead, TableRow } from '@mui/material';
import * as S from '@/styles/table';
import { motion } from 'framer-motion';
import type { ValidatorsTableProps } from './types';
import { numberFormat } from '@/utils/number';
import Link from 'next/link';
import React from 'react';
const MotionTableRow = motion(TableRow);

export default function ValidatorsTable({ data }: ValidatorsTableProps) {
  const numberFormat = new Intl.NumberFormat('en-US', { style: 'decimal' });
  const [randomData, setRandomData] = React.useState<ValidatorsTableProps['data']>([]);

  useEffect(() => {
    const randomizedData = [...data].sort(() => Math.random() - 0.5);
    setRandomData(randomizedData);
  }, [data]);

  return (
    <div className='w-full overflow-x-auto rounded-md border border-shade-800 bg-shade-900'>
      <Table aria-label='Validators Table'>
        <TableHead>
          <S.StyledTableRow>
            <S.StyledTableHeadCell size='medium'>RANK</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>VALIDATORS</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>LOCATION</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>TOTAL VOTES</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>VOTES %</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>WEBSITE</S.StyledTableHeadCell>
          </S.StyledTableRow>
        </TableHead>
        <S.StyledTableBody>
          {randomData.map((row) => (
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
                <span className='text-primary'>{row.rank}</span>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <Link
                  href={`/address/${row.name}`}
                  className='inline-block max-w-full truncate align-middle text-white hover:underline'
                >
                  <span className=''>{row.name}</span>
                </Link>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <span className=''>{row.location}</span>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <span className=''>{numberFormat.format(row.totalVotes / 10000)}</span>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <span className='inline-block w-16 truncate align-middle'>{row.percentage}%</span>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <a href={row.url} target='_blank' className='text-primary hover:underline'>
                  {row.url}
                </a>
              </S.StyledTableCell>
            </MotionTableRow>
          ))}
        </S.StyledTableBody>
      </Table>
    </div>
  );
}

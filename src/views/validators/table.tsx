'use client';

import { Table, TableHead, TableRow } from '@mui/material';
import * as S from '@/styles/table';
import { motion } from 'framer-motion';
import type { ValidatorsTableProps } from './types';
import Link from 'next/link';
import * as React from 'react';
import * as Switch from '@radix-ui/react-switch';
import clsx from 'clsx';
const MotionTableRow = motion(TableRow);

export default function ValidatorsTable({ data }: ValidatorsTableProps) {
  const numberFormat = new Intl.NumberFormat('en-US', { style: 'decimal' });

  const [sortByAsc, setSortByAsc] = React.useState(false);
  const selectedData = React.useMemo(() => {
    return sortByAsc
      ? [...data].sort((a, b) => a.rank - b.rank)
      : [...data].sort(() => Math.random() - 0.5);
  }, [sortByAsc]);

  return (
    <>
    <div className='flex items-center mb-6'>
      <div
        className={clsx('text-base font-medium leading-none transition', {
          'text-shade-400': sortByAsc,
          'text-black': !sortByAsc,
        })}
      >
        Random
      </div>
      <Switch.Root
        onCheckedChange={(checked) => setSortByAsc(checked)}
        className='relative mx-4 w-16 rounded-full bg-shade-100 py-1.5 outline-none border'
        style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
      >
        <Switch.Thumb className='block h-6 w-6 translate-x-1.5 rounded-full bg-indigo-500 transition will-change-transform data-[state=checked]:translate-x-[34px]' />
      </Switch.Root>
      <div className='relative'>
        <div
          className={clsx('text-base font-medium leading-none transition', {
            'text-shade-400': !sortByAsc,
            'text-black': sortByAsc,
          })}
        >
          Sort by Rank
        </div>
      </div>
    </div>
    <div className='w-full overflow-x-auto rounded-md border border-shade-200 bg-white'>
      <Table aria-label='Validators Table'>
        <TableHead>
          <S.StyledTableRow>
            <S.StyledTableHeadCell size='medium'>RANK</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>
              VALIDATORS
            </S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>
              LOCATION
            </S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>
              TOTAL VOTES
            </S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>VOTES %</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>WEBSITE</S.StyledTableHeadCell>
          </S.StyledTableRow>
        </TableHead>
        <S.StyledTableBody>
          {selectedData.map((row) => (
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
                  className='inline-block max-w-full truncate align-middle hover:underline'
                >
                  <span className=''>{row.name}</span>
                </Link>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <span className=''>{row.location}</span>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <span className=''>
                  {numberFormat.format(row.totalVotes / 10000)}
                </span>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <span className='inline-block w-16 truncate align-middle'>
                  {row.percentage}%
                </span>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <a
                  href={row.url}
                  target='_blank'
                  className='text-primary hover:underline'
                >
                  {row.url}
                </a>
              </S.StyledTableCell>
            </MotionTableRow>
          ))}
        </S.StyledTableBody>
      </Table>
    </div>
    </>
  );
}

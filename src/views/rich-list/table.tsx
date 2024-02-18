'use client';

import { Table, TableHead, TableRow } from '@mui/material';
import * as S from '@/styles/table';
import { motion } from 'framer-motion';
import type { RichListTableProps } from './types';
import Link from 'next/link';
import * as React from 'react';

import * as Switch from '@radix-ui/react-switch';
import clsx from 'clsx';
const MotionTableRow = motion(TableRow);

interface DataItem {
  rank: number; 
  account: string;
  amount: number;
  url?: string;
}

interface ValidatorsTableProps {
  liquidData: DataItem[];
  stakedData: DataItem[];
}

export default function RichListTable({ data, data2 }: RichListTableProps) {
  const numberFormat = new Intl.NumberFormat('en-US', { style: 'decimal' });

  const [showLiquid, setShowLiquid] = React.useState(false); // if (true) default:topstakers 
  const toggleDataView = () => setShowLiquid(!showLiquid);
  const dataToDisplay = showLiquid ? data : data2;


  return (
    <>
      <div className='flex items-center mb-6 justify-center'>
        <div
          className={clsx('text-base font-medium leading-none transition', {
            'text-shade-400': showLiquid,
            'text-black': !showLiquid,
          })}
        >
          Top Holders
        </div>
        <Switch.Root
          checked={showLiquid}
          onCheckedChange={toggleDataView}
          className='relative mx-4 w-16 rounded-full bg-shade-100 py-1.5 outline-none border'
          style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
        >
          <Switch.Thumb className='block h-6 w-6 translate-x-1.5 rounded-full bg-indigo-500 transition will-change-transform data-[state=checked]:translate-x-[34px]' />
        </Switch.Root>
        <div className='relative'>
          <div
            className={clsx('text-base font-medium leading-none transition', {
              'text-shade-400': !showLiquid, 
              'text-black': showLiquid, 
            })}
          >
            Top Stakers
          </div>
        </div>
      </div>


      <div className='w-full overflow-x-auto rounded-md border border-shade-200 bg-white'>
        <Table aria-label='Validators Table'>
          <TableHead>
            <S.StyledTableRow>
              <S.StyledTableHeadCell size='medium'>RANK</S.StyledTableHeadCell>
              <S.StyledTableHeadCell size='medium'>
                ACCOUNT
              </S.StyledTableHeadCell>
              <S.StyledTableHeadCell size='medium'>
                TOTAL
              </S.StyledTableHeadCell>

            </S.StyledTableRow>
          </TableHead>
          <S.StyledTableBody>
            {dataToDisplay.map((item, index) => (
              <MotionTableRow
                key={index}
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
                  <span className='text-primary'>{index+1}</span>
                </S.StyledTableCell>
                <S.StyledTableCell size='medium'>
                  <Link
                    href={`/address/${item.account}`}
                    className='inline-block max-w-full truncate align-middle hover:underline'
                  >
                    <span className=''>{item.account}</span>
                  </Link>
                </S.StyledTableCell>
                <S.StyledTableCell size='medium'>
                  <span className=''>{numberFormat.format(item.amount)}</span>
                </S.StyledTableCell>


                <S.StyledTableCell size='medium'>
                  <a
                    href="{row.url}"
                    target='_blank'
                    className='text-primary hover:underline'
                  >

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
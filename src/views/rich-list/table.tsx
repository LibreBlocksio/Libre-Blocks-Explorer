import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableRow } from '@mui/material';
import * as S from '@/styles/table';
import { motion } from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';
import type { RichListTableProps } from './types';

const MotionTableRow = motion(TableRow);

interface DataItem {
  rank: number;
  account: string;
  amount: number;
}

export default function RichListTable({ data, data2 }: RichListTableProps) {
  const numberFormat = new Intl.NumberFormat();
  const [selectedTab, setSelectedTab] = useState('balance');

  const calculateTotalData = () => {
    const combinedData = [...data, ...data2];
    const accountMap = new Map();

    combinedData.forEach((item) => {
      if (accountMap.has(item.account)) {
        const existing = accountMap.get(item.account);
        accountMap.set(item.account, { ...item, amount: existing.amount + item.amount });
      } else {
        accountMap.set(item.account, item);
      }
    });

    return Array.from(accountMap.values()).sort((a, b) => b.amount - a.amount);
  };

  const [totalData, setTotalData] = useState<DataItem[]>(calculateTotalData());

  useEffect(() => {
    setTotalData(calculateTotalData());
  }, [data, data2, selectedTab]);

  const dataToDisplay = selectedTab === 'holders' ? data : selectedTab === 'stakers' ? data2 : totalData;

  return (
    <>
      <div className='flex items-center mb-6 justify-center'>
        <div className="flex gap-4">
          <button onClick={() => setSelectedTab('balance')} className={clsx('px-4 py-2 rounded', { 'bg-indigo-500 text-white': selectedTab === 'balance', 'bg-shade-100 text-shade-400': selectedTab !== 'balance' })}>Top Balance</button>
          <button onClick={() => setSelectedTab('holders')} className={clsx('px-4 py-2 rounded', { 'bg-indigo-500 text-white': selectedTab === 'holders', 'bg-shade-100 text-shade-400': selectedTab !== 'holders' })}>Top Holders</button>
          <button onClick={() => setSelectedTab('stakers')} className={clsx('px-4 py-2 rounded', { 'bg-indigo-500 text-white': selectedTab === 'stakers', 'bg-shade-100 text-shade-400': selectedTab !== 'stakers' })}>Top Stakers</button>
        </div>
      </div>

      <div className='w-full overflow-x-auto rounded-md border border-shade-200 bg-white'>
        <Table aria-label='Rich List Table'>
          <TableHead>
            <S.StyledTableRow>
              <S.StyledTableHeadCell>RANK</S.StyledTableHeadCell>
              <S.StyledTableHeadCell>ACCOUNT</S.StyledTableHeadCell>
              <S.StyledTableHeadCell>TOTAL</S.StyledTableHeadCell>
            </S.StyledTableRow>
          </TableHead>
          <S.StyledTableBody>
            {dataToDisplay.map((item, index) => (
              <MotionTableRow
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                <S.StyledTableCell>{index + 1}</S.StyledTableCell>
                <S.StyledTableCell>
                  <Link href={`/address/${item.account}`}>
                    {item.account}
                  </Link>
                </S.StyledTableCell>
                <S.StyledTableCell>
                  {numberFormat.format(item.amount)}
                </S.StyledTableCell>
              </MotionTableRow>
            ))}
          </S.StyledTableBody>
        </Table>
      </div>
    </>
  );
}

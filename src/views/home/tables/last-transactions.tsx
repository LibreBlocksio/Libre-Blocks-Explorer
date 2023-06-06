import { useLastTransactions } from '@/hooks/api';
import * as S from '@/styles/table';
import type { ParamsLastTransactions, ResponseLastTransactions } from '@/types';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { ChevronRight, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import TimeAgo from 'react-timeago';

const MotionTableRow = motion(TableRow);

const initialState: ParamsLastTransactions = {
  limit: 10,
  sort: 'desc',
  simple: true,
};

const LastTransactionsTable = () => {
  const lastTransactionsQuery = useLastTransactions<ResponseLastTransactions>(initialState);

  if (lastTransactionsQuery.isLoading) {
    return <span>Loading...</span>;
  }

  if (lastTransactionsQuery.isError) {
    return <span>Error: {lastTransactionsQuery.error?.message}</span>;
  }

  const { data } = lastTransactionsQuery;
  const tableData = data.simple_actions;

  return (
    <div className='w-full overflow-x-auto rounded-md border border-shade-800 bg-shade-900'>
      <Table aria-label='Last Transactions'>
        <TableHead>
          <S.StyledTableRow>
            <S.StyledTableHeadCell size='medium'>BLOCK</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>TX HASH</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>TIMESTAMP</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>PRODUCER</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>ACTION</S.StyledTableHeadCell>
          </S.StyledTableRow>
        </TableHead>
        <S.StyledTableBody>
          {tableData.map((row) => (
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
                <Link
                  href={`/block/${row.block}`}
                  className='inline-block max-w-full truncate align-middle text-primary hover:underline'
                >
                  {row.block}
                </Link>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <div className='max-w-[220px]'>
                  <Tooltip title={row.transaction_id} placement='bottom'>
                    <Link
                      href={`/tx/${row.transaction_id}`}
                      className='inline-block max-w-full truncate align-middle hover:underline'
                    >
                      {row.transaction_id}
                    </Link>
                  </Tooltip>
                </div>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <Tooltip
                  title={dayjs(row.timestamp).utc(true).format('MMM DD, YYYY HH:mm:ss A')}
                  placement='bottom'
                >
                  <div className='inline-block w-28 truncate align-middle'>
                    <TimeAgo title='' date={dayjs(row.timestamp).utc(true).toDate()} /> UTC
                  </div>
                </Tooltip>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                {row.data.data?.header?.producer ?? '-'}
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <span className='inline-flex rounded-full bg-shade-800 px-3 py-1 capitalize'>
                  {row.action}
                </span>
              </S.StyledTableCell>
            </MotionTableRow>
          ))}
        </S.StyledTableBody>
      </Table>
    </div>
  );
};

export default function LastTransactions() {
  return (
    <div>
      <div className='mb-3 flex items-end justify-between'>
        <div>
          <h4 className='text-xl font-semibold text-white'>Last Transactions</h4>
          <div className='mt-1 flex items-center space-x-2'>
            <RefreshCcw className='h-3 w-3 text-shade-300' />
            <span className='text-xs text-shade-300'>Data is updated every 10 seconds.</span>
          </div>
        </div>
        <Link
          href='/txs'
          className='inline-flex items-center space-x-1 text-lg font-medium text-primary hover:underline'
        >
          <span>View All</span>
          <ChevronRight className='h-5 w-5' />
        </Link>
      </div>
      <LastTransactionsTable />
    </div>
  );
}

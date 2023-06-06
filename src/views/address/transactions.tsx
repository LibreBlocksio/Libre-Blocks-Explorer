import * as S from '@/styles/table';
import { Table, TableHead, TableRow, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useActions } from '@/hooks/api';
import Loading from '@/components/loading';
import * as React from 'react';

const MotionTableRow = motion(TableRow);

export default function Transactions({ account }: { account: string }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const getActionsQuery = useActions({ limit: rowsPerPage, skip: rowsPerPage * page, account });

  if (getActionsQuery.isLoading) {
    return <Loading />;
  }

  if (getActionsQuery.isError) {
    return (
      <div className='container py-20 text-center'>
        <div className='text-3xl font-medium'>No account found.</div>
        <div className='mt-10'>Error: {getActionsQuery.error?.message}</div>
      </div>
    );
  }

  const { data } = getActionsQuery;
  const currentPageData = data.actions;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className='w-full overflow-x-auto rounded-md border border-shade-800 bg-shade-900'>
      <Table aria-label='Last Transactions'>
        <TableHead>
          <S.StyledTableRow>
            <S.StyledTableHeadCell size='medium'>TX HASH</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>DATE</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>ACTION</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>DATA</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>AMOUNT</S.StyledTableHeadCell>
            <S.StyledTableHeadCell size='medium'>DETAIL</S.StyledTableHeadCell>
          </S.StyledTableRow>
        </TableHead>
        <S.StyledTableBody>
          {currentPageData.map((row) => (
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
                <div className='max-w-[220px]'>
                  <Tooltip title={row.trx_id} placement='bottom'>
                    <Link
                      href={`/tx/${row.trx_id}`}
                      className='inline-block max-w-full truncate align-middle text-primary hover:underline'
                    >
                      {row.trx_id}
                    </Link>
                  </Tooltip>
                </div>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <Tooltip
                  title={dayjs(row.timestamp)
                    .utc(true)
                    .format('MMM DD, YYYY HH:mm:ss A' + ' UTC')}
                  placement='bottom'
                >
                  <div className='inline-block max-w-full truncate align-middle'>
                    {dayjs(row.timestamp).utc(true).format('MMM DD, YYYY HH:mm:ss A')}
                  </div>
                </Tooltip>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <span className='inline-flex rounded-full bg-shade-800 px-3 py-1 capitalize'>
                  {row.act.name}
                </span>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <div className='flex max-w-[220px] items-center space-x-1'>
                  <Tooltip title={row.act.data.from} placement='bottom'>
                    <Link
                      href={`/address/${row.act.data.from}`}
                      className='inline-block max-w-full truncate align-middle text-primary hover:underline'
                    >
                      <span className='inline-block truncate align-middle'>
                        {row.act.data.from}
                      </span>
                    </Link>
                  </Tooltip>
                  {row.act.data.to ? <ArrowRight className='h-4 w-4 shrink-0' /> : '-'}

                  <Tooltip title={row.act.data.to} placement='bottom'>
                    <Link
                      href={`/address/${row.act.data.to}`}
                      className='inline-block max-w-full truncate align-middle text-primary hover:underline'
                    >
                      <span className='inline-block truncate align-middle'>{row.act.data.to}</span>{' '}
                    </Link>
                  </Tooltip>
                </div>
              </S.StyledTableCell>
              <S.StyledTableCell size='medium'>{row.act.data.quantity}</S.StyledTableCell>
              <S.StyledTableCell size='medium'>
                <div className='max-w-[220px]'>
                  <Tooltip title={row.act.data.memo} placement='bottom'>
                    <span className='inline-block max-w-full truncate align-middle'>
                      {row.act.data.memo}
                    </span>
                  </Tooltip>
                </div>
              </S.StyledTableCell>
            </MotionTableRow>
          ))}
        </S.StyledTableBody>
      </Table>
      <div className='flex items-center justify-between pl-6'>
        <div className='text-sm'>Page: {page + 1}</div>
        <S.StyledTablePagination
          component='div'
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          count={-1}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </div>
    </div>
  );
}

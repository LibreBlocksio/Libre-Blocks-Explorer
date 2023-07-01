import * as S from '@/styles/table';
import { Table, TableHead, TableRow, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useActions } from '@/hooks/api';
import Loading from '@/components/loading';
import * as React from 'react';
import { getTransaction } from '@/lib/api';
import type { ResponseGetTransaction } from '@/types';
import { useRouter } from 'next/router';

const MotionTableRow = motion(TableRow);

export default function Transactions({ account }: { account: string }) {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const getActionsQuery = useActions({ limit: rowsPerPage, skip: rowsPerPage * page, account });
  const [resolvedMappedCurrentPageData, setResolvedMappedCurrentPageData] = React.useState<
    ResponseGetTransaction['actions']
  >([]);

  React.useEffect(() => {
    //console.log('getActionsQuery: ', getActionsQuery);
    if (getActionsQuery.isLoading || getActionsQuery.isError) return;
    const { data } = getActionsQuery;
    const currentPageData = data.actions;

    const fetchData = async () => {
      const resolvedData = await Promise.all(
        currentPageData.map(async (row) => {
          const action = row.act.name;
          if (action.toLowerCase() === 'claim') {
            const claimData = await getTransaction({ queryKey: [, { id: row.trx_id }] });
            const data = claimData.actions[Math.min(claimData.actions.length - 1, 2)].act.data;
            row.act.data = data;
          }
          return row;
        })
      );

      setResolvedMappedCurrentPageData(
        resolvedData as unknown as ResponseGetTransaction['actions']
      );
    };

    fetchData();
  }, [getActionsQuery.isLoading, getActionsQuery.isError, getActionsQuery.dataUpdatedAt]);

  if (getActionsQuery.isLoading || resolvedMappedCurrentPageData.length === 0) {
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

  const handleRowClick = (row: any) => {
    const url = `/tx/${row.trx_id}`;
    router.push(url);
  };

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
          {resolvedMappedCurrentPageData.map((row) => (
            <MotionTableRow
              className='cursor-pointer hover:bg-[#191919]'
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
              onClick={() => handleRowClick(row)}
            >
              <S.StyledTableCell size='medium'>
                <div className='max-w-[220px]'>
                  <Tooltip title={row.trx_id} placement='bottom'>
                    <Link
                      href={`/tx/${row.trx_id}`}
                      className='inline-block max-w-full truncate align-middle text-primary hover:underline'
                    >
                      {row.trx_id.slice(0, 6) + '....' + row.trx_id.slice(-6)}
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
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[13px] capitalize ${
                    row.act.name === 'claim' ? 'bg-orange-700' : 'bg-shade-800'
                  }`}
                >
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
              <S.StyledTableCell size='medium'>
                <span className='inline-flex rounded-full bg-shade-800 px-2 py-1 text-[13px] capitalize'>
                  {row.act.data.quantity}{' '}
                  {row.act.data.quantity && row.act.data.quantity.includes('LIBRE') && (
                    <img src='/images/symbols/LIBRE.svg' alt='LIBRE Icon' className='ml-1 h-5' />
                  )}
                  {row.act.data.quantity && row.act.data.quantity.includes('PBTC') && (
                    <img src='/images/symbols/PBTC.svg' alt='PBTC Icon' className='ml-1 h-5' />
                  )}
                  {row.act.data.quantity && row.act.data.quantity.includes('BTCLIB') && (
                    <img src='/images/symbols/BTCLIB.svg' alt='BTCLIB Icon' className='ml-1 h-5' />
                  )}
                  {row.act.data.quantity && row.act.data.quantity.includes('PUSDT') && (
                    <img src='/images/symbols/PUSDT.svg' alt='PUSDT Icon' className='ml-1 h-5' />
                  )}
                </span>
              </S.StyledTableCell>
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
      <div className=' items-center justify-center lg:items-center '>
        <S.StyledTablePagination
          component='div'
          rowsPerPageOptions={[10, 25, 50]}
          count={-1}
          labelRowsPerPage='Rows:'
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </div>
    </div>
  );
}

"use client";

import { useLastTransactions } from "@/hooks/api";
import * as S from "@/styles/table";
import type { ResponseLastSwapTransactions } from "@/types";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import TimeAgo from "react-timeago";
import CustomPagination from "@/components/custom-pagination";
import Loading from "@/components/loading";
import { groupAndMergeDataByKey } from "@/lib/groupAndMergeDataByKey";

const MotionTableRow = motion(TableRow);

const LastSwapTransactionsTable = () => {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;
  const lastTransactionsQuery =
    useLastTransactions<ResponseLastSwapTransactions>({
      limit: 1000,
      sort: "desc",
      simple: true,
      account: "swap.libre",
    });

  const fetchData = () => {
    if (lastTransactionsQuery.isLoading) {
      return { loading: true };
    }

    if (lastTransactionsQuery.isError) {
      return { error: lastTransactionsQuery.error };
    }

    const { data } = lastTransactionsQuery;
    const tableData = groupAndMergeDataByKey({
      filterBy: "transaction_id",
      data: data?.simple_actions,
    });

    return { tableData };
  };

  const dataResult = fetchData();
  const { tableData } = dataResult;

  const visibleRows = React.useMemo(() => {
    if (!tableData) return [];

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return tableData.slice(startIndex, endIndex);
  }, [tableData, page, rowsPerPage]);

  if (dataResult.loading) {
    return <Loading />;
  }

  if (dataResult.error) {
    return <span>Error: {dataResult.error.message}</span>;
  }

  return (
    <div className="bg-whtie w-full rounded-xl border border-shade-200 p-2">
      <div className="w-full overflow-x-auto">
        <Table aria-label="Last Transactions">
          <TableHead>
            <S.StyledTableRow>
              <S.StyledTableHeadCell size="medium">
                Tx Hash
              </S.StyledTableHeadCell>
              <S.StyledTableHeadCell size="medium">Date</S.StyledTableHeadCell>
              <S.StyledTableHeadCell size="medium">
                Action
              </S.StyledTableHeadCell>
              <S.StyledTableHeadCell size="medium">Data</S.StyledTableHeadCell>
              <S.StyledTableHeadCell size="medium">Memo</S.StyledTableHeadCell>
            </S.StyledTableRow>
          </TableHead>
          <S.StyledTableBody>
            {visibleRows.map((row) => (
              <MotionTableRow
                key={`${JSON.stringify(row)}`}
                layout
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: "auto",
                  display: "table-row",
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                  },
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  display: "none",
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <S.StyledTableCell size="medium">
                  <div className="max-w-[220px]">
                    <Tooltip title={row.transaction_id} placement="bottom">
                      <Link
                        href={`/tx/${row.transaction_id}`}
                        className="inline-block max-w-full truncate align-middle text-primary hover:underline"
                      >
                        {row.transaction_id.slice(0, 6) +
                          "...." +
                          row.transaction_id.slice(-6)}
                      </Link>
                    </Tooltip>
                  </div>
                </S.StyledTableCell>
                <S.StyledTableCell size="medium">
                  <Tooltip
                    title={dayjs(row.timestamp)
                      .utc(true)
                      .format("MMM DD, YYYY HH:mm:ss A" + " UTC")}
                    placement="bottom"
                  >
                    <div className="inline-block w-28 truncate align-middle">
                      {/* @ts-ignore */}
                      <TimeAgo
                        date={dayjs(row.timestamp).utc(true).toDate()}
                      />{" "}
                      UTC
                    </div>
                  </Tooltip>
                </S.StyledTableCell>
                <S.StyledTableCell size="medium">
                  {row.action}
                </S.StyledTableCell>
                <S.StyledTableCell size="medium">
                  <div className="flex items-center space-x-3">
                    <div className="flex max-w-[220px] items-center space-x-1">
                      <Tooltip title={row.data.from} placement="bottom">
                        <Link
                          href={`/address/${row.data.from}`}
                          className="inline-block max-w-full truncate align-middle text-primary hover:underline"
                        >
                          <span className="inline-block truncate align-middle">
                            {row.data.from}
                          </span>
                        </Link>
                      </Tooltip>
                      {row.data.to ? (
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      ) : (
                        "-"
                      )}
                      <Tooltip title={row.data.to} placement="bottom">
                        <Link
                          href={`/address/${row.data.to}`}
                          className="inline-block max-w-full truncate align-middle text-primary hover:underline"
                        >
                          <span className="inline-block truncate align-middle">
                            {row.data.to}
                          </span>
                        </Link>
                      </Tooltip>
                    </div>
                    {row.data.amount && (
                      <div className="flex min-w-max items-center space-x-1 rounded border border-shade-200 p-1 text-sm">
                        <Tooltip title={row.data.amount} placement="bottom">
                          <span>
                            {row.data.symbol === "PBTC"
                              ? row.data.amount.toFixed(9)
                              : row.data.amount.toFixed(2)}
                          </span>
                        </Tooltip>
                        <img
                          src={`/images/symbols/${row.data.symbol}.svg`}
                          alt=""
                          className="block h-5 w-5 shrink-0 object-contain"
                        />
                        <span className="font-semibold">{row.data.symbol}</span>
                      </div>
                    )}
                  </div>
                </S.StyledTableCell>
                <S.StyledTableCell size="medium">
                  <div className="max-w-[220px]">
                    <Tooltip title={row.data.memo} placement="bottom">
                      <span className="inline-block max-w-full truncate align-middle">
                        {row.data.memo}
                      </span>
                    </Tooltip>
                  </div>
                </S.StyledTableCell>
              </MotionTableRow>
            ))}
          </S.StyledTableBody>
        </Table>
      </div>
      <CustomPagination
        dataLength={tableData?.length ?? 0}
        onPageChange={(value) => setPage(value)}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export default function LastSwapTransactions() {
  return (
    <div>
      <div className="mb-3 flex items-end justify-between">
        <h4 className="mb-3 text-2xl font-semibold">Last Swap Transactions</h4>
      </div>
      <LastSwapTransactionsTable />
    </div>
  );
}

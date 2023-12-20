"use client";

import * as S from "@/styles/table";
import { Table, TableHead, TableRow, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useActions } from "@/hooks/api";
import Loading from "@/components/loading";
import * as React from "react";
import { getTransaction } from "@/lib/api";
import type { ResponseGetTransaction } from "@/types";
import TimeAgo from "react-timeago";
import CustomPagination from "@/components/custom-pagination";

const MotionTableRow = motion(TableRow);

const TransactionsTable = ({ account }: { account: string }) => {
  const [page, setPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [pageDataLoading, setPageDataLoading] = React.useState(false);
  const rowsPerPage = 10;

  const getActionsQuery = useActions({
    limit: 1000,
    account,
  });

  const [resolvedMappedCurrentPageData, setResolvedMappedCurrentPageData] =
    React.useState<ResponseGetTransaction["actions"]>([]);

  React.useEffect(() => {
    if (getActionsQuery.isLoading || getActionsQuery.isError) return;
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const { data } = getActionsQuery;
    setTotalPages(data?.actions.length ?? 0);
    const currentPageData = data?.actions.slice(startIndex, endIndex) || [];

    const fetchData = async () => {
      setPageDataLoading(true);

      const resolvedData = await Promise.all(
        currentPageData.map(async (row) => {
          const action = row.act.name;
          if (action.toLowerCase() === "claim") {
            const claimData = await getTransaction({
              queryKey: [, { id: row.trx_id }],
            });
            const data =
              claimData.actions[Math.min(claimData.actions.length - 1, 2)].act
                .data;
            row.act.data = data;
          }
          return row;
        })
      );

      setPageDataLoading(false);

      setResolvedMappedCurrentPageData(
        () => resolvedData as unknown as ResponseGetTransaction["actions"]
      );
    };

    fetchData();
  }, [
    getActionsQuery.isLoading,
    getActionsQuery.isError,
    getActionsQuery.dataUpdatedAt,
    page,
    rowsPerPage,
  ]);

  if (getActionsQuery.isLoading || resolvedMappedCurrentPageData.length === 0) {
    return <Loading />;
  }

  if (getActionsQuery.isError) {
    return (
      <div className="container py-20 text-center">
        <div className="text-3xl font-medium">No account found.</div>
        <div className="mt-10">Error: {getActionsQuery.error?.message}</div>
      </div>
    );
  }

  return (
    <div className="bg-whtie w-full rounded-xl border border-shade-200 p-2">
      <div className="w-full overflow-x-auto">
        {pageDataLoading ? (
          <Loading />
        ) : (
          <Table aria-label="Last Transactions">
            <TableHead>
              <S.StyledTableRow>
                <S.StyledTableHeadCell size="medium">
                  Tx Hash
                </S.StyledTableHeadCell>
                <S.StyledTableHeadCell size="medium">
                  Date
                </S.StyledTableHeadCell>
                <S.StyledTableHeadCell size="medium">
                  Action
                </S.StyledTableHeadCell>
                <S.StyledTableHeadCell size="medium">
                  Data
                </S.StyledTableHeadCell>
                <S.StyledTableHeadCell size="medium">
                  Memo
                </S.StyledTableHeadCell>
              </S.StyledTableRow>
            </TableHead>
            <S.StyledTableBody>
              {resolvedMappedCurrentPageData.map((row) => (
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
                      <Tooltip title={row.trx_id} placement="bottom">
                        <Link
                          href={`/tx/${row.trx_id}`}
                          className="inline-block max-w-full truncate align-middle text-primary hover:underline"
                        >
                          {row.trx_id.slice(0, 6) +
                            "...." +
                            row.trx_id.slice(-6)}
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
                    {row.act.name}
                  </S.StyledTableCell>
                  <S.StyledTableCell size="medium">
                    <div className="flex items-center space-x-3">
                      <div className="flex max-w-[220px] items-center space-x-1">
                        <Tooltip title={row.act.data.from} placement="bottom">
                          <Link
                            href={`/address/${row.act.data.from}`}
                            className="inline-block max-w-full truncate align-middle text-primary hover:underline"
                          >
                            <span className="inline-block truncate align-middle">
                              {row.act.data.from}
                            </span>
                          </Link>
                        </Tooltip>
                        {row.act.data.to ? (
                          <ArrowRight className="h-4 w-4 shrink-0" />
                        ) : (
                          "-"
                        )}
                        <Tooltip title={row.act.data.to} placement="bottom">
                          <Link
                            href={`/address/${row.act.data.to}`}
                            className="inline-block max-w-full truncate align-middle text-primary hover:underline"
                          >
                            <span className="inline-block truncate align-middle">
                              {row.act.data.to}
                            </span>{" "}
                          </Link>
                        </Tooltip>
                      </div>
                      {row.act.data.amount && (
                        <div className="flex min-w-max items-center space-x-1 rounded border border-shade-200 p-1 text-sm">
                          <Tooltip
                            title={row.act.data.amount}
                            placement="bottom"
                          >
                            <span>
                              {typeof row.act.data.amount === "number"
                                ? row.act.data.symbol === "PBTC"
                                  ? row.act.data.amount.toFixed(9)
                                  : row.act.data.amount.toFixed(2)
                                : "-"}
                            </span>
                          </Tooltip>
                          <img
                            src={`/images/symbols/${row.act.data.symbol}.svg`}
                            alt=""
                            className="block h-5 w-5 shrink-0 object-contain"
                          />
                          <span className="font-semibold">
                            {row.act.data.symbol}
                          </span>
                        </div>
                      )}
                    </div>
                  </S.StyledTableCell>
                  <S.StyledTableCell size="medium">
                    <div className="max-w-[220px]">
                      <Tooltip title={row.act.data.memo} placement="bottom">
                        <span className="inline-block max-w-full truncate align-middle">
                          {row.act.data.memo}
                        </span>
                      </Tooltip>
                    </div>
                  </S.StyledTableCell>
                </MotionTableRow>
              ))}
            </S.StyledTableBody>
          </Table>
        )}
      </div>
      <CustomPagination
        dataLength={totalPages ?? 0}
        onPageChange={(value) => setPage(value)}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export default function Transactions({ account }: { account: string }) {
  return (
    <div>
      <div className="mb-3 flex items-end justify-between">
        <h4 className="mb-3 text-2xl font-semibold">Transactions</h4>
      </div>
      <TransactionsTable account={account} />
    </div>
  );
}

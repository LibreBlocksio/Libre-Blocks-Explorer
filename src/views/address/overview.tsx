import { useExchangeRates, useOrdinalsMarketcap } from "@/hooks/api";
import { currencyFormat } from "@/utils/number";
import Link from "next/link";
import type { OverviewProps } from "./types";
import { useState, useEffect } from "react";

export default function AccountOverview({ tokens }: OverviewProps) {
  const exchangeRatesQuery = useExchangeRates();
  const ordinalsMarketcapQuery = useOrdinalsMarketcap();
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (exchangeRatesQuery.isSuccess) {
      const exchangeRates = exchangeRatesQuery.data;
      let total = 0;

      tokens.forEach((token) => {
        const value = token.amount * exchangeRates[token.symbol];
        if (!isNaN(value)) {
          total += value;
        }
      });

      setTotalValue(total);
    }
  }, [exchangeRatesQuery.isSuccess, tokens]);

  if (exchangeRatesQuery.isLoading || ordinalsMarketcapQuery.isLoading) {
    return <span>Loading...</span>;
  }

  if (exchangeRatesQuery.isError || ordinalsMarketcapQuery.isError) {
    return (
      <span>
        Error: {exchangeRatesQuery.error?.message}{" "}
        {ordinalsMarketcapQuery.error?.message}
      </span>
    );
  }

  const exchangeRates = exchangeRatesQuery.data;
  const sortedTokens = [...tokens].sort((a, b) => {
    const aValue = (a.amount || 0) * (exchangeRates[a.symbol] || 0);
    const bValue = (b.amount || 0) * (exchangeRates[b.symbol] || 0);
    if (isNaN(aValue)) return 1;
    if (isNaN(bValue)) return -1;
    return bValue - aValue;
  });

  const BTCPrice = exchangeRatesQuery.data?.PBTC;

  const ordinalsMarketcap = ordinalsMarketcapQuery.data;

  return (
    <div className="flex-1">
      <div className="w-full overflow-x-auto rounded-md border border-shade-800 bg-shade-900">
        <table className="custom-table">
          <thead>
            <tr>
              <th>TOKEN</th>
              <th>BALANCE</th>
              <th>VALUE</th>
            </tr>
          </thead>
          <tbody>
            {sortedTokens
              .filter(
                (token) => token.contract !== "ord.libre" && token.amount !== 0
              )
              .map((token) => (
                // ... Rest of your code for rendering each token

                <tr key={token.symbol}>
                  <td>
                    <div className="flex items-center space-x-4">
                      <div className="">
                        {[
                          "PBTC",
                          "PUSDT",
                          "BTCUSD",
                          "LIBRE",
                          "BTCLIB",
                        ].includes(token.symbol.toUpperCase()) ? (
                          <img
                            src={`/images/symbols/${token.symbol.toUpperCase()}.svg`}
                            alt={token.symbol.toUpperCase()}
                            className="h-8 w-8 shrink-0"
                          />
                        ) : (
                          <div className="flex h-11 w-11 flex-col items-center justify-center rounded-full bg-blue-500">
                            <a className="text-xs uppercase">
                              {token.symbol.toUpperCase()}
                            </a>
                          </div>
                        )}
                      </div>

                      <Link
                        href={"../tokens"}
                        className="inline-block max-w-full truncate align-middle  hover:underline"
                      >
                        <span>{token.symbol}</span>
                      </Link>
                    </div>
                  </td>
                  <td>{token?.amount ?? 0}</td>
                  <td>
                    {isNaN(token.amount * exchangeRates[token.symbol]) ? (
                      <span style={{ color: "white" }}>
                        $
                        {(
                          token.amount *
                          (ordinalsMarketcap.tokens.find(
                            (t) => t.mappedName === token.symbol
                          )?.price ?? 0) *
                          BTCPrice
                        ).toLocaleString("en-US", {
                          maximumFractionDigits: 3,
                        })}
                      </span>
                    ) : (
                      <span style={{ color: "white" }}>
                        $
                        {(
                          token.amount * exchangeRates[token.symbol]
                        ).toLocaleString("en-US", {
                          maximumFractionDigits: 3,
                        })}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
          <div></div>

          <div></div>
        </table>
        <div className=" flex justify-center py-3 text-[15px]">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            Total: $
            {totalValue.toLocaleString("en-US", { maximumFractionDigits: 3 })}
            <br />
            <span style={{ fontSize: "small" }}>
              {" "}
              (Calculated excluding BRC Tokens)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import type { ParamsLastTransactions, ResponseLastTransactions } from '@/types';
import { useChainInfo, useLastTransactions, useDefillamaTVL, useChainInfo2 } from '@/hooks/api';
import { numberFormat } from '@/utils/number';

const initialState: ParamsLastTransactions = {
  limit: 1,
  sort: 'desc',
  simple: true,
};

const formatTVLWithCommas = (tvlString: string | undefined) => {
  if (tvlString) {
    const tvlNumber = parseFloat(tvlString);
    if (!isNaN(tvlNumber)) {
      return tvlNumber.toLocaleString('en-US', { maximumFractionDigits: 0 }); 
    }
  }
  return "N/A";
};

export default function MiniCards() {
  const TVL = useDefillamaTVL().data;

  const formattedTVL = formatTVLWithCommas(TVL);

  const lastTransactionsQuery =
    useLastTransactions<ResponseLastTransactions>(initialState);
  const chainInfoQuery = useChainInfo();
  const chainInfoQuery2 = useChainInfo2();

  if (lastTransactionsQuery.isLoading || chainInfoQuery.isLoading) {
    return <span>Loading...</span>;
  }

  if (lastTransactionsQuery.isError || chainInfoQuery.isError) {
    return (
      <span>
        Error:{' '}
        {lastTransactionsQuery.error?.message || chainInfoQuery.error?.message}
      </span>
    );
  }

  const { data: lastTransactionsData } = lastTransactionsQuery;
  const { data: chainInfoData } = chainInfoQuery;
  const { data: chainInfoData2 } = chainInfoQuery2;

  
  if (!lastTransactionsData || !chainInfoData) {
    return null;
  }

  const action = lastTransactionsData.simple_actions[0];
  const block_height = action.block;
  const producer = action.data?.data?.header?.producer ?? '-';
  const totalWalletAddress = chainInfoData.accounts;






  const miniCards = [
    {
      title: 'Total Value Locked (TVL)',
      value: `$${formattedTVL.replace(/\./g, ",")}`, 
    },
    {
      title: 'Block Height',
      value: numberFormat(block_height),
    },
    {
      title: 'Producer',
      value: chainInfoData2?.head_block_producer,
    },
    {
      title: 'Total Wallet Address',
      value: numberFormat(totalWalletAddress),
    },
  ];

  return (
    <div>
      <h4 className='mb-3 text-2xl font-semibold'>Stats</h4>
      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
        {miniCards.map((item, i) => (
          <div
            className='flex flex-col rounded-xl border border-shade-200 px-5 py-3'
            key={i}
          >
            <div className='text-2xl font-medium'>{item.value}</div>
            <div className='text-sm font-medium text-shade-400'>
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

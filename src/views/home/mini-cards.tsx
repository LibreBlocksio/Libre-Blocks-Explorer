import type { ParamsLastTransactions, ResponseLastTransactions } from '@/types';
import { useChainInfo, useLastTransactions } from '@/hooks/api';
import { numberFormat } from '@/utils/number';

const initialState: ParamsLastTransactions = {
  limit: 1,
  sort: 'desc',
  simple: true,
};

export default function MiniCards() {
  const lastTransactionsQuery = useLastTransactions<ResponseLastTransactions>(initialState);
  const chainInfoQuery = useChainInfo();

  if (lastTransactionsQuery.isLoading || chainInfoQuery.isLoading) {
    return <span>Loading...</span>;
  }

  if (lastTransactionsQuery.isError || chainInfoQuery.isError) {
    return (
      <span>Error: {lastTransactionsQuery.error?.message || chainInfoQuery.error?.message}</span>
    );
  }

  const { data: lastTransactionsData } = lastTransactionsQuery;
  const action = lastTransactionsData.simple_actions[0];
  const block_height = action.block;
  const producer = action.data?.data?.header?.producer ?? '-';

  const { data: chainInfoData } = chainInfoQuery;
  const totalWalletAddress = chainInfoData.accounts;

  const miniCards = [
    {
      title: 'Total Value Locked (TVL)',
      value: '$4,995,253',
    },
    {
      title: 'Block Height',
      value: numberFormat(block_height),
    },
    {
      title: 'Producer',
      value: producer,
    },
    {
      title: 'Total Wallet Address',
      value: numberFormat(totalWalletAddress),
    },
  ];

  return (
    <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
      {miniCards.map((item, i) => (
        <div className='flex flex-col rounded-xl border border-shade-800 py-2.5 px-5' key={i}>
          <div className='text-sm font-medium text-shade-500'>{item.title}</div>
          <div className='mt-auto text-2xl font-medium text-white'>{item.value}</div>
        </div>
      ))}
    </div>
  );
}

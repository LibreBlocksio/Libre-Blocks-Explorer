'use client';

import BlockOverview from './overview';
import BlockNum from './block-num';
import BlockTabs from './tabs';
import NoTransaction from './no-transaction';
import Loading from '@/components/loading';
import { useBlock } from '@/hooks/api';
import { useParams } from 'next/navigation';

export default function ViewBlock() {
  const params = useParams();
  const id = params?.id;
  const blockQuery = useBlock({ block_num_or_id: id as string });

  if (blockQuery.isLoading) {
    return <Loading />;
  }

  if (blockQuery.isError) {
    return (
      <div className='container py-20 text-center'>
        <div className='text-3xl font-medium'>No block found.</div>
        <div className='mt-10'>Error: {blockQuery.error?.message}</div>
      </div>
    );
  }

  const { data } = blockQuery;

  if (!data) {
    return null;
  }

  return (
    <div className='container'>
      <div className='my-6 space-y-6 md:my-12'>
        {data?.transactions?.length > 0 ? (
          <>
            <BlockNum block_num={data.block_num} />
            <div className='flex flex-wrap space-y-12 md:flex-nowrap md:space-x-6 md:space-y-0'>
              <div className='w-full md:w-1/3'>
                <BlockOverview data={data} />
              </div>
              <div className='w-full md:w-2/3'>
                <BlockTabs transactions={data.transactions} />
              </div>
            </div>
          </>
        ) : (
          <NoTransaction data={data} />
        )}
      </div>
    </div>
  );
}

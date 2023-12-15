'use client';

import { useParams } from 'next/navigation';
import TxOverview from './overview';
import TxTabs from './tabs';
import TrxID from './trx-id';
import { useTransaction } from '@/hooks/api';
import Loading from '@/components/loading';

export default function ViewTx() {
  const params = useParams();
  const id = params?.id;
  const getTransactionQuery = useTransaction({ id: id as string });

  if (getTransactionQuery.isLoading) {
    return <Loading />;
  }

  if (getTransactionQuery.isError) {
    return (
      <div className='container py-20 text-center'>
        <div className='text-3xl font-medium'>No transaction found.</div>
        <div className='mt-10'>Error: {getTransactionQuery.error?.message}</div>
      </div>
    );
  }

  const { data } = getTransactionQuery;

  if (data && !data.actions) {
    return (
      <div className='container py-20 text-center'>
        <div className='text-3xl font-medium'>No transaction found.</div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className='container'>
      <div className='my-6 space-y-6 md:my-12'>
        <TrxID trx_id={data.trx_id} />
        <div className='flex flex-wrap space-y-12 md:flex-nowrap md:space-x-6 md:space-y-0'>
          <div className='w-full md:w-1/3'>
            <TxOverview data={data} />
          </div>
          <div className='w-full md:w-2/3'>
            <TxTabs actions={data.actions} />
          </div>
        </div>
      </div>
    </div>
  );
}

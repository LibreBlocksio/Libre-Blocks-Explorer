'use client';

import AccountOverview from '@/views/address/overview';
import AccountProducers from '@/views/address/producers';
import Transactions from '@/views/address/transactions';

import { useParams } from 'next/navigation';
import { useAccount } from '@/hooks/api';
import Loading from '@/components/loading';

export default function ViewAddress() {
  const params = useParams();
  const searchTerm = params?.searchTerm;
  const getAccountQuery = useAccount({ account: searchTerm as string });

  if (getAccountQuery.isLoading) {
    return <Loading />;
  }

  if (getAccountQuery.isError || getAccountQuery.data?.actions.length === 0) {
    return (
      <div className='container py-20 text-center'>
        <div className='text-3xl font-medium'>No account found.</div>
        <div className='mt-10'>Error: {getAccountQuery.error?.message}</div>
      </div>
    );
  }

  const { data: accountData } = getAccountQuery;

  if (!accountData) {
    return null;
  }

  return (
    <div>
      <div className='border-b border-shade-200'>
        <div className='container'>
          <div className='flex py-5 text-2xl font-semibold'>
            <span className='mr-3 text-shade-500'>Account:</span>
            <span className='text-primary'>
              {accountData.account.account_name}
            </span>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='my-12'>
          <AccountProducers accountData={accountData} />
        </div>
        <div className='my-12'>
          <AccountOverview account={accountData.account.account_name} />
        </div>
        <div className='my-12'>
          <Transactions account={accountData.account.account_name} />
        </div>
      </div>
    </div>
  );
}

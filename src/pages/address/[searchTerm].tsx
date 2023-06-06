import { useRouter } from 'next/router';
import ViewAddress from '@/views/address';

import { useAccount } from '@/hooks/api';
import Loading from '@/components/loading';
import Seo from '@/components/seo';

export default function PageAddressDetail() {
  const router = useRouter();
  const { searchTerm } = router.query;
  const getAccountQuery = useAccount({ account: searchTerm as string });

  if (getAccountQuery.isLoading) {
    return <Loading />;
  }

  if (getAccountQuery.isError) {
    return (
      <div className='container py-20 text-center'>
        <div className='text-3xl font-medium'>No account found.</div>
        <div className='mt-10'>Error: {getAccountQuery.error?.message}</div>
      </div>
    );
  }

  const { data: accountData } = getAccountQuery;

  const seoTitle = `Account Details`;

  return (
    <>
      <Seo title={seoTitle} />
      <ViewAddress accountData={accountData} />
    </>
  );
}

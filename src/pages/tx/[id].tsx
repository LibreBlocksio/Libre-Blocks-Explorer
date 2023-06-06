import { useRouter } from 'next/router';
import ViewTx from '@/views/tx';
import { useTransaction } from '@/hooks/api';
import Loading from '@/components/loading';
import Seo from '@/components/seo';

export default function PageTx() {
  const router = useRouter();
  const { id } = router.query;
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

  const seoTitle = `Transaction Details - ${id}`;

  if (!data.actions) {
    return (
      <div className='container py-20 text-center'>
        <div className='text-3xl font-medium'>No transaction found.</div>
      </div>
    );
  }

  return (
    <>
      <Seo title={seoTitle} />
      <ViewTx data={data} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}

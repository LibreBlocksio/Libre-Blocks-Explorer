import { useProducers, useTokens } from '@/hooks/api';
import Loading from '@/components/loading';
import ViewTokens from '@/views/tokens';

export default function PageTokens() {
  const producersQuery = useTokens();

  if (producersQuery.isLoading) {
    return <Loading />;
  }

  if (producersQuery.isError) {
    return (
      <div className='container py-20 text-center'>
        <div className='mt-10'>Error: {producersQuery.error?.message}</div>
      </div>
    );
  }

  const { data: producersData } = producersQuery;

  return (
    <>
      <ViewTokens data={producersData} />
      {/* <pre>{JSON.stringify(producersData, null, 2)}</pre> */}
    </>
  );
}

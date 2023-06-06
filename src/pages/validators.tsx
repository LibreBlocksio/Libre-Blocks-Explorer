import { useProducers } from '@/hooks/api';
import Loading from '@/components/loading';
import ViewValidators from '@/views/validators';

export default function PageValidators() {
  const producersQuery = useProducers();

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
      <ViewValidators data={producersData} />
      {/* <pre>{JSON.stringify(producersData, null, 2)}</pre> */}
    </>
  );
}

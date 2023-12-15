'use client';

import ValidatorsTable from './table';
import { useProducers } from '@/hooks/api';
import Loading from '@/components/loading';

export default function ViewValidators() {
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

  if (!producersData) {
    return null;
  }

  return (
    <div className='container my-12'>
      <ValidatorsTable data={producersData} />
    </div>
  );
}

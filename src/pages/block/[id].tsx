import { useRouter } from 'next/router';
import Loading from '@/components/loading';
import { useBlock } from '@/hooks/api';
import Seo from '@/components/seo';
import ViewBlock from '@/views/block';

export default function PageBlock() {
  const router = useRouter();
  const { id } = router.query;
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

  const seoTitle = `Block Details - ${id}`;

  return (
    <>
      <Seo title={seoTitle} />
      <ViewBlock data={data} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}

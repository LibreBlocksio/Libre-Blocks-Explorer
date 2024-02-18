'use client';

import RichListTable from './table';
import { useLiquidRichList, useStakedRichList } from '@/hooks/api';
import Loading from '@/components/loading';

export default function ViewRichList() {

  const liquidRichListQuery = useLiquidRichList();
  const stakedRichListQuery = useStakedRichList();

  if (liquidRichListQuery.isLoading || stakedRichListQuery.isLoading) {
    return <Loading />;
  }

  if (liquidRichListQuery.isError || stakedRichListQuery.isError) {
    return (
      <div className='container py-20 text-center'>
        <div className='mt-10'>
          Error: {liquidRichListQuery.error?.message || stakedRichListQuery.error?.message}
        </div>
      </div>
    );
  }
  const liquidRichListData = liquidRichListQuery.data ? liquidRichListQuery.data : [];
  const stakedRichListData = stakedRichListQuery.data ? stakedRichListQuery.data : [];


  return (
    <div className='container my-12'>
 <RichListTable  data={liquidRichListData} data2={stakedRichListData} />   </div>
  );
}

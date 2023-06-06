import BlockOverview from './overview';
import BlockNum from './block-num';
import BlockTabs from './tabs';
import NoTransaction from './no-transaction';
import type { ViewProps } from './types';

export default function ViewBlock({ data }: ViewProps) {
  return (
    <div className='container'>
      <div className='my-6 space-y-6 md:my-12'>
        {data?.transactions?.length > 0 ? (
          <>
            <BlockNum block_num={data.block_num} />
            <div className='flex flex-wrap space-y-12 md:flex-nowrap md:space-y-0 md:space-x-6'>
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

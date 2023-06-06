import TxOverview from './overview';
import TxTabs from './tabs';
import TrxID from './trx-id';
import type { ViewProps } from './types';

export default function ViewTx({ data }: ViewProps) {
  return (
    <div className='container'>
      <div className='my-6 space-y-6 md:my-12'>
        <TrxID trx_id={data.trx_id} />
        <div className='flex flex-wrap space-y-12 md:flex-nowrap md:space-y-0 md:space-x-6'>
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

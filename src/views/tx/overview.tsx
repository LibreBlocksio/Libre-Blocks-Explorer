import Link from 'next/link';
import type { OverviewProps } from './types';
import * as React from 'react';
import dayjs from 'dayjs';
import TimeAgo from 'react-timeago';

export default function TxOverview({ data }: OverviewProps) {
  const [actionState, setActionState] = React.useState<'pending' | 'irreversible'>('pending');
  const firstAction = data.actions[0];
  const timestamp = firstAction['@timestamp'];
  const difference = dayjs(timestamp).diff(dayjs(), 'minute');

  function checkDifference() {
    if (difference > 2) {
      setActionState('pending');
    } else {
      setActionState('irreversible');
    }
  }

  React.useEffect(() => {
    checkDifference();
    const intervalId = setInterval(() => {
      checkDifference();
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='divide-y divide-shade-800 rounded-xl border border-shade-800 bg-black pb-5 text-white'>
      <div className='p-5'>
        <div className='align-center inline-block rounded-full bg-primary px-3 py-1.5 text-xs font-medium capitalize'>
          {actionState}
        </div>
        <p className='mt-5 text-sm'>
          <TimeAgo title='' date={dayjs(timestamp).utc(true).toDate()} />
          <br />
          {dayjs(timestamp).utc(true).format('MMM DD, YYYY h:mm A')} UTC
        </p>
      </div>
      <div className='flex items-center justify-between px-5 py-3'>
        <p>Block</p>
        <p className='font-semibold'>
          <Link href={`/block/${firstAction.block_num}`} className='text-primary hover:underline'>
            {firstAction.block_num}
          </Link>
        </p>
      </div>
      <div className='flex items-center justify-between space-x-2 px-5 py-3'>
        <p>Total Actions</p>
        <p className='text-right font-semibold'>{data.actions.length}</p>
      </div>
      <div className='flex items-center justify-between space-x-2 px-5 py-3'>
        <p>Producer</p>
        <Link
          href={`/address/${firstAction.producer}`}
          className='text-right font-semibold hover:underline'
        >
          {firstAction.producer}
        </Link>
      </div>

      <div className='flex items-center justify-between space-x-2 px-5 py-3'>
        <p>CPU Usage</p>
        <p className='text-right font-semibold'>{firstAction.cpu_usage_us} µs</p>
      </div>

      <div className='flex items-center justify-between space-x-2 px-5 py-3'>
        <p>NET Usage</p>
        <p className='text-right font-semibold'>{firstAction.net_usage_words}</p>
      </div>

      <div className=' flex-col items-start justify-between break-words px-5 py-3'>
        <p>Memo</p>
        <p className='text-left font-semibold '>{firstAction.act.data.memo || '-'}</p>
      </div>
    </div>
  );
}

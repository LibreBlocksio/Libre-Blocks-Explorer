import type { OverviewProps } from './types';
import Link from 'next/link';

export default function NoTransaction({ data }: OverviewProps) {
  return (
    <div className='space-y-4'>
      <div className=''>
        <span className='font-semibold'>Block:</span>{' '}
        <span className='text-primary'>{data.block_num}</span>
      </div>
      <div className=''>
        <span className='font-semibold'>Producer:</span>{' '}
        <Link href={`/address/${data.producer}`} className='text-primary hover:underline'>
          {data.producer}
        </Link>
      </div>
    </div>
  );
}

// import Link from 'next/link';
// import { Tooltip } from '@mui/material';
import Link from 'next/link';
import type { MessageCardProps } from './types';

const MessageRow = ({
  property,
  value,
}: {
  property: number | string;
  value: number | string;
}) => {
  const isLink = property === 'from' || property === 'to';

  return (
    <div>
      <p className='font-semibold capitalize'>{property}</p>
      {isLink ? (
        <Link
          href={`/address/${value}`}
          className='text-primary hover:underline'
        >
          {value}
        </Link>
      ) : (
        <div className='flex-col justify-between break-words  text-primary'>
          {value}
        </div>
      )}
    </div>
  );
};

export default function BlockMessageCard({ name, data }: MessageCardProps) {
  return (
    <div className='rounded-md border border-shade-200 bg-white'>
      <div className='border-b border-shade-200 px-5 py-2.5'>
        <p className='font-semibold uppercase'>{name}</p>
      </div>
      <div className='space-y-3 p-5'>
        {/* 
        - TX bizim data içinden gelmediği için bu tooltipli versiyon kullanılmadı 
        - The version with this tooltip was not used because the TX did not come from our data.

        <div>
          <p className='font-semibold'>Delegator Address</p>
          <div className=''>
            <Tooltip title='0xE11DA2997F2bD2A44715c1b1a18b31e1BDF8CCfE' placement='bottom'>
              <Link
                href={`/address/0xE11DA2997F2bD2A44715c1b1a18b31e1BDF8CCfE`}
                className='text-primary hover:underline'
              >
                0xE11DA2997F2bD2A44715c1b1a18b31e1BDF8CCfE
              </Link>
            </Tooltip>
          </div>
        </div> 
        */}

        {Object.entries(data).map(
          ([property, value]) =>
            property !== 'quantity' &&
            !!value &&
            typeof value !== 'object' && (
              <MessageRow key={property} property={property} value={value} />
            )
        )}

        {!!data?.quantity && (
          <div>
            <p className='font-semibold'>Value</p>
            <div className='mt-1.5'>
              <div className='align-center inline-block rounded-md border border-shade-200 bg-white p-3'>
                <p className='font-semibold'>{data.quantity}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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

export default function TxMessageCard({ name, message }: MessageCardProps) {
  return (
    <div className='rounded-md border border-shade-200 bg-white'>
      <div className='border-b border-shade-200 px-5 py-2.5'>
        <p className='font-semibold uppercase'>{name}</p>
      </div>
      <div className='space-y-3 p-5'>
        {Object.entries(message).map(
          ([property, value]) =>
            property !== 'quantity' &&
            !!value &&
            typeof value !== 'object' && (
              <MessageRow key={property} property={property} value={value} />
            )
        )}

        {!!message?.quantity && (
          <div>
            <p className='font-semibold'>Value</p>
            <div className='mt-1.5'>
              <div className='align-center inline-block rounded-md border border-shade-200 bg-white p-3'>
                <p className='font-semibold'>{message.quantity}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

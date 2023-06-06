import type { LogCardProps } from './types';
import Link from 'next/link';

export default function TxLogCard({ receiver, global_sequence, index }: LogCardProps) {
  interface ReceiverLabels {
    'btc.ptokens': string;
    'usdt.ptokens': string;
    'swap.libre': string;
    'wheel2.libre': string;
    'farm.libre': string;
    'reward.libre': string;
    'sfee.libre': string;
    'eosio.token': string;
  }

  const receiverLabels: Record<keyof ReceiverLabels, string> = {
    'btc.ptokens': 'pTokens BTC',
    'usdt.ptokens': 'pTokens USDT',
    'swap.libre': 'Libre Swap',
    'wheel2.libre': 'Daily Spin',
    'farm.libre': 'Libre Farming',
    'reward.libre': 'Swap Farming Rewards',
    'sfee.libre': 'Swap fee Voting',
    'eosio.token': 'standard Token Contract',
  };

  const label = receiverLabels[receiver as keyof ReceiverLabels] || 'Account';

  return (
    <div className='rounded-md border border-shade-800 bg-shade-900'>
      <div className='border-b border-shade-800 py-2.5 px-5'>
        <p className='font-semibold'>{index}</p>
      </div>
      <div className='space-y-3 p-5'>
        <div>
          <p className='font-semibold'>{label}</p>

          <div className=''>
            {receiver ? (
              <Link href={`/address/${receiver}`} className='text-primary hover:underline'>
                {receiver}
              </Link>
            ) : (
              <span>No receiver found.</span>
            )}
          </div>
        </div>

        <div>
          <p className='font-semibold'>Global Sequence</p>
          <div className=''>
            {global_sequence ? (
              <span className='text-primary'>{global_sequence}</span>
            ) : (
              <span>No global sequence found.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import * as React from 'react';
import { Copy, Check } from 'lucide-react';
import type { TrxIdProps } from './types';

export default function TrxID({ trx_id }: TrxIdProps) {
  const [state, setState] = React.useState<'copied' | 'idle'>('idle');

  function copy() {
    if (state === 'copied') return;

    navigator.clipboard.writeText(trx_id).then(() => {
      setState('copied');
    });
  }

  React.useEffect(() => {
    if (state === 'copied') {
      let handle = window.setTimeout(() => {
        setState('idle');
      }, 1000);
      return () => {
        window.clearTimeout(handle);
      };
    }
  }, [state]);

  return (
    <div className='flex items-center'>
      <span className='block truncate text-base font-semibold'>TXID: {trx_id}</span>
      <button className='relative ml-2' onClick={() => copy()}>
        {state === 'copied' ? (
          <Check className='h-5 w-5 text-green-500' strokeWidth={3} />
        ) : (
          <Copy className='h-5 w-5 text-shade-500' />
        )}
      </button>
    </div>
  );
}

'use client';

import * as React from 'react';
import { Copy, Check } from 'lucide-react';
import type { BlockNumProps } from './types';

export default function BlockNum({ block_num }: BlockNumProps) {
  const [state, setState] = React.useState<'copied' | 'idle'>('idle');

  function copy() {
    if (state === 'copied') return;

    navigator.clipboard.writeText(block_num.toString()).then(() => {
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
      <span className='block truncate text-base font-semibold'>
        Block Num: {block_num}
      </span>
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

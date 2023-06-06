import type { ViewProps } from './types';
import TokensTable from './table';

export default function ViewTokens({ data }: ViewProps) {
  return (
    <div className='container my-12'>
      <TokensTable data={data} />
    </div>
  );
}

import type { ViewProps } from './types';
import ValidatorsTable from './table';

export default function ViewValidators({ data }: ViewProps) {
  return (
    <div className='container my-12'>
      <ValidatorsTable data={data} />
    </div>
  );
}

import BrcTable from './brc-table';
import NormalTable from './normal-table';

export default function ViewTokens() {
  return (
    <div className='container my-12 space-y-12'>
      <NormalTable />
      <BrcTable />
    </div>
  );
}

import MiniCards from '@/views/home/mini-cards';

export default function PageBlockchain() {
  return (
    <div className='container'>
      <div className='mt-10'>
        <MiniCards />
      </div>

      <div className='mt-12 grid gap-6 md:grid-cols-2'></div>
    </div>
  );
}

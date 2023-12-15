import CoinInfo from './coin-info';
import MiniCards from './mini-cards';
import PriceChart from './price-chart';
import LastSwapTransactions from './tables/last-swap-transactions';

export default function ViewHome() {
  return (
    <>
      <div className='container'>
        <div className='mt-10'>
          <MiniCards />
        </div>

        <div className='mt-12 grid gap-6 md:grid-cols-6'>
          <div className='col-span-6 xl:col-span-2'>
            <CoinInfo />
          </div>
          <div className='col-span-6 xl:col-span-4'>
            <PriceChart />
          </div>
        </div>

        <div className='mt-12'>
          <LastSwapTransactions />
        </div>
      </div>
    </>
  );
}

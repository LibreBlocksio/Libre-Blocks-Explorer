import CoinInfo from './coin-info';
import MiniCards from './mini-cards';
import PriceChart from './price-chart';
import LastSwapTransactions from './tables/last-swap-transactions';
import LastTransactions from './tables/last-transactions';

export default function ViewHome() {
  return (
    <>
      <div className='container'>
        <div className='mt-10'>
          <MiniCards />
        </div>

        <div className='mt-12 grid gap-6 md:grid-cols-2'>
          <CoinInfo />
          <PriceChart />
        </div>

        <div className='mt-12'>
          <LastTransactions />
        </div>

        <div className='mt-12'>
          <LastSwapTransactions />
        </div>
      </div>
    </>
  );
}

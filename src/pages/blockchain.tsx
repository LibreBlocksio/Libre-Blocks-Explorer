import CoinInfo from '../views/home/coin-info';
import MiniCards from '../views/home/mini-cards';
import PriceChart from '../views/home/price-chart';

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

import AccountOverview from '@/views/address/overview';
import AccountProducers from '@/views/address/producers';
import StakeDetails from '@/views/address/stake-details';
import Transactions from '@/views/address/transactions';

import type { ViewProps } from './types';

export default function ViewAddress({ accountData }: ViewProps) {
  const stakeDetailsData = [
    {
      name: 'Liquid',
      value: accountData.account?.core_liquid_balance,
    },
    {
      name: 'Staked',
      value: accountData.account?.voter_info?.staked,
      //Some accounts may not have balance or stake data.
    },
  ];

  return (
    <div>
      <div className='flex h-16 items-center bg-gradient-to-r from-[#ff6200] to-[#ff8c00]'>
        <div className='container'>
          <span className='text-3xl font-medium capitalize'>
            {accountData.account.account_name}
          </span>
        </div>
      </div>

      <div className='container'>
        <h4 className='mb-4 mt-5  text-xl font-semibold text-white'>Wallet Account Overview</h4>
        <AccountProducers accountData={accountData} />

        <div className='my-5 space-y-6 md:flex md:space-x-6 md:space-y-0'>
          <AccountOverview tokens={accountData.tokens} />
          <StakeDetails data={stakeDetailsData} />
        </div>
        <div className='my-12'>
          <Transactions account={accountData.account.account_name} />
        </div>
      </div>
    </div>
  );
}

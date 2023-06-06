import AccountOverview from '@/views/address/overview';
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
        <div className='my-12 space-y-6 md:flex md:space-y-0 md:space-x-6'>
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

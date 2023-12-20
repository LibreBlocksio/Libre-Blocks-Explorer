import type { ResponseGetAccount } from '@/types';

export type ViewProps = {
  accountData: ResponseGetAccount;
};

export type OverviewProps = {
  account: string;
};

export type StakeDetailsProps = {
  data: Array<{ name: string; value: number | string }>;
};

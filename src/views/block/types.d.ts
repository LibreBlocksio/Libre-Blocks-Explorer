import type { ResponseGetBlock } from '@/types';

export type OverviewProps = {
  data: ResponseGetBlock;
};

export type BlockNumProps = { block_num: string | number };

export type TabsProps = {
  transactions: ResponseGetBlock['transactions'];
};

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export type MessageCardProps = {
  name?: string;
  data: {
    from?: string;
    to?: string;
    quantity?: string;
    memo?: string;
  };
};

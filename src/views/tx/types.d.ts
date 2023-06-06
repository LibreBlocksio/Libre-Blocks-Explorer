import type { ResponseGetTransaction } from '@/types';

export type ViewProps = {
  data: ResponseGetTransaction;
};

export type LogCardProps = ResponseGetTransaction['actions'][number]['receipts'][number] & {
  index: number;
};

export type MessageCardProps = {
  name: ResponseGetTransaction['actions'][number]['act']['name'];
  message: ResponseGetTransaction['actions'][number]['act']['data'];
};

export type OverviewProps = {
  data: ResponseGetTransaction;
};

export type TabsProps = {
  actions: ResponseGetTransaction['actions'];
};

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export type TrxIdProps = { trx_id: string };

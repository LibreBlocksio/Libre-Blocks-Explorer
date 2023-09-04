import type { QueryKey } from '@tanstack/react-query';
import axios from 'axios';

export const getCoinInfo = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_DASHBOARD_API}/tokens`);
  return data;
};

export const getChainInfo = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_DASHBOARD_API}/stats/chain`);
  return data;
};

export const getExchangeRates = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_DASHBOARD_API}/exchange-rates`);
  return data;
};

export const getLastTransactions = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_key, queryParams] = queryKey;
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_LIBRE_API}/get_actions`, {
    params: queryParams,
  });

  return data;
};

export const getAccount = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_key, queryParams] = queryKey;
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HYPERION_API}/state/get_account`, {
    params: queryParams,
  });
  return data;
};

export const getActions = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_key, queryParams] = queryKey;
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HYPERION_API}/history/get_actions`, {
    params: queryParams, //limit=20&skip=5&account=salimcan
  });
  return data;
};

export const getTransaction = async ({ queryKey }: { queryKey: any }) => {
  const [_key, queryParams] = queryKey;
  if (!queryParams.id) {
    return [];
  }

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_LIBRE_API}/get_transaction`, {
    params: queryParams,
  });
  return data;
};

export const getBlock = async ({ queryKey }: { queryKey: any }) => {
  const [_key, queryParams] = queryKey;
  if (!queryParams.block_num_or_id) {
    return [];
  }

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BLOCK_API}/chain/get_block`, {
    block_num_or_id: queryParams.block_num_or_id,
  });
  return data;
};

export const getProducers = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_LIBRE_DASHBOARD_API}/producers`);
  return data;
};

export const getTokens = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_DASHBOARD_API}/tokens`);
  return data;
};

export const getOrdinalsMarketcap = async () => {
  const { data } = await axios.get(`https://ordinals-api.libre.org/marketcap`);
  return data;
};

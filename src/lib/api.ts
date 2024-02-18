import type { QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import API_URLS from '@/api-urls';

const defaultApiUrl = API_URLS.find((k) => k.default)?.url!;
const apiUrl =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('apiUrl')!) || defaultApiUrl
    : defaultApiUrl;

export const getCoinInfo = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_LIBRE_API}/tokens`,
  );
  return data;
};

export const getChainInfo = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_LIBRE_API}/stats/chain`,
  );
  return data;
};

export const getChainInfo2 = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_MAINNET_API}/v1/chain/get_info`,
  );
  return data;
};
export const getLiquidRichList = async () => {
  const { data } = await axios.get(
    `https://dashboard-api.libre.org/stats/libre/liquid`,
  );
  return data;
};

export const getStakedRichList = async () => {
  const { data } = await axios.get(
    `https://dashboard-api.libre.org/stats/libre/staker-richlist`,
  );
  return data;
};

export const getExchangeRates = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_LIBRE_API}/exchange-rates`,
  );
  return data;
};

export const getLastTransactions = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}) => {
  const [_key, queryParams] = queryKey;
  const { data } = await axios.get(`${apiUrl}/v2/history/get_actions`, {
    params: queryParams,
  });

  return data;
};

export const getAccount = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_key, queryParams] = queryKey;
  const { data } = await axios.get(`${apiUrl}/v2/state/get_account`, {
    params: queryParams,
  });
  return data;
};

export const getActions = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_key, queryParams] = queryKey;
  const { data } = await axios.get(`${apiUrl}/v2/history/get_actions`, {
    params: queryParams, //limit=20&skip=5&account=salimcan
  });
  return data;
};

export const getTransaction = async ({ queryKey }: { queryKey: any }) => {
  const [_key, queryParams] = queryKey;
  if (!queryParams.id) {
    return [];
  }

  const { data } = await axios.get(`${apiUrl}/v2/history/get_transaction`, {
    params: queryParams,
  });
  return data;
};

export const getBlock = async ({ queryKey }: { queryKey: any }) => {
  const [_key, queryParams] = queryKey;
  if (!queryParams.block_num_or_id) {
    return [];
  }

  const { data } = await axios.post(`${apiUrl}/v1/chain/get_block`, {
    block_num_or_id: queryParams.block_num_or_id,
  });
  return data;
};

export const getProducers = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_LIBRE_API}/producers`,
  );
  return data;
};

export const getTokens = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_LIBRE_API}/tokens`,
  );
  return data;
};

export const getOrdinalsMarketcap = async () => {
  const { data } = await axios.get(`https://heliopolis.libreblocks.com/brctokenscap.json`);
  return data;
};

export const getDefillamaTVL = async () => {
  const { data } = await axios.get(`https://api.llama.fi/tvl/libre-swap`);
  return data;
};

export const getAccountTokens = async ({ queryKey }: { queryKey: any }) => {
  const [_key, queryParams] = queryKey;
  if (!queryParams.account) {
    return [];
  }

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_MAINNET_API}/v2/state/get_tokens`,
    {
      params: queryParams,
    },
  );
  return data;
};

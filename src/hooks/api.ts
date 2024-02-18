import { useQuery } from '@tanstack/react-query';

import type {
  ParamsGetAccount,
  ParamsGetActions,
  ParamsGetTransaction,
  ParamsLastTransactions,
  ParamsGetBlock,
  ResponseChainInfo,
  ResponseCoinInfo,
  ResponseExchangeRates,
  ResponseGetAccount,
  ResponseGetActions,
  ResponseGetTransaction,
  ResponseGetProducers,
  ResponseGetTokens,
  ResponseGetBlock,
  ResponseOrdinalsMarketcap,
  ResponseGetDefillama,
  ResponseChainInfo2,
  ResponseLiquidRichList,
  ResponseStakedRichList,
  ParamsGetAccountTokens,
  ResponseGetAccountTokens,
} from '@/types';
import * as api from '@/lib/api';

export const useCoinInfo = () => {
  return useQuery<ResponseCoinInfo, Error>({
    queryKey: ['coinInfo'],
    queryFn: api.getCoinInfo,
  });
};

export const useChainInfo2 = () => {
  return useQuery<ResponseChainInfo2, Error>({
    queryKey: ['head_block_num'],
    queryFn: api.getChainInfo2,
    refetchInterval: 10 * 1000, // 10 second
  });
};

export const useChainInfo = () => {
  return useQuery<ResponseChainInfo, Error>({
    queryKey: ['chainInfo'],
    queryFn: api.getChainInfo,
  });
};

export const useExchangeRates = () => {
  return useQuery<ResponseExchangeRates, Error>({
    queryKey: ['exchangeRates'],
    queryFn: api.getExchangeRates,
  });
};

/**
 * I used <T> to dynamically determine the response type based on the parameters sent.
 * When using it, we will specify the type of response we expect.
 *
 * Example:
 *  useLastTransactions<ResponseLastTransactions>
 *  useLastTransactions<ResponseLastSwapTransactions>
 */

export const useLastTransactions = <T>(params: ParamsLastTransactions) => {
  return useQuery<T, Error>({
    queryKey: ['exchangeRates', params],
    queryFn: api.getLastTransactions,
    refetchInterval: 10 * 1000, // 10 second
  });
};

export const useAccount = (params: ParamsGetAccount) => {
  return useQuery<ResponseGetAccount, Error>({
    queryKey: ['getAccount', params],
    queryFn: api.getAccount,
    retry: 0, // When the searched account cannot be found, there is no need to retry.
    refetchOnWindowFocus: false,
  });
};

export const useActions = (params: ParamsGetActions) => {
  return useQuery<ResponseGetActions, Error>({
    queryKey: ['getActions', params],
    queryFn: api.getActions,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    staleTime: Infinity,
  });
};

export const useTransaction = (params: ParamsGetTransaction) => {
  return useQuery<ResponseGetTransaction, Error>({
    queryKey: ['getTransaction', params],
    queryFn: api.getTransaction,
    retry: 0, // When the searched tx cannot be found, there is no need to retry.
    refetchOnWindowFocus: false,
  });
};

export const useBlock = (params: ParamsGetBlock) => {
  return useQuery<ResponseGetBlock, Error>({
    queryKey: ['getBlock', params],
    queryFn: api.getBlock,
    retry: 0,
    refetchOnWindowFocus: false,
  });
};

export const useProducers = () => {
  return useQuery<ResponseGetProducers, Error>({
    queryKey: ['producers'],
    queryFn: api.getProducers,
  });
};

export const useLiquidRichList = () => {
  return useQuery<ResponseLiquidRichList, Error>({
    queryKey: ['liquidrichlist'],
    queryFn: api.getLiquidRichList,
  });
};

export const useStakedRichList = () => {
  return useQuery<ResponseStakedRichList, Error>({
    queryKey: ['stakedrichlist'],
    queryFn: api.getStakedRichList,
  });
};

export const useTokens = () => {
  return useQuery<ResponseGetTokens, Error>({
    queryKey: ['coinInfo'],
    queryFn: api.getTokens,
  });
};

export const useOrdinalsMarketcap = () => {
  return useQuery<ResponseOrdinalsMarketcap, Error>({
    queryKey: ['ordinalsMarketcap'],
    queryFn: api.getOrdinalsMarketcap,
  });
};

export const useDefillamaTVL = () => {
  return useQuery<ResponseGetDefillama, Error>({
    queryKey: ['DefiLlamaTVL'],
    queryFn: api.getDefillamaTVL, // Defillama
  });
};

export const useAccountTokens = (params: ParamsGetAccountTokens) => {
  return useQuery<ResponseGetAccountTokens, Error>({
    queryKey: ['accountTokens', params],
    queryFn: api.getAccountTokens,
  });
};

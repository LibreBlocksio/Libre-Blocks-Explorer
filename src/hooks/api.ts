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
} from '@/types';
import * as api from '@/lib/api';

export const useCoinInfo = () => {
  return useQuery<ResponseCoinInfo, Error>({ queryKey: ['coinInfo'], queryFn: api.getCoinInfo });
};

export const useChainInfo = () => {
  return useQuery<ResponseChainInfo, Error>({ queryKey: ['chainInfo'], queryFn: api.getChainInfo });
};

export const useExchangeRates = () => {
  return useQuery<ResponseExchangeRates, Error>({
    queryKey: ['exchangeRates'],
    queryFn: api.getExchangeRates,
  });
};

/**
 * response tipi gönderilen parametrelere göre değiştiği için <T> ile dinamik olarak aldık
 * kullandığımız yerde nasıl bir response tipi beklediğimizi belirteceğiz
 *
 * Örn:
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
    retry: 0, // aranan hesap bulunamayınca tekrar denemeye gerek yok
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
    retry: 0, // aranan transaction bulunamayınca tekrar denemeye gerek yok
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

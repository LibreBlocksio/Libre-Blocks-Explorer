export type ResponseCoinInfo = {
  name: string;
  symbol: string;
  supply: number;
  marketCap: number;
  staked: number;
  apy: string | null;
}[];

export type ResponseChainInfo = {
  accounts: number;
  active: number;
  newAccounts: number;
  referrals: number;
};

export type ResponseChainInfo2 = {
  server_version: string;
  chain_id: string;
  head_block_num: number;
  last_irreversible_block_num: number;
  last_irreversible_block_id: string;
  head_block_id: string;
  head_block_time: string;
  head_block_producer: string;
  virtual_block_cpu_limit: number;
  virtual_block_net_limit: number;
  block_cpu_limit: number;
  block_net_limit: number;
  server_version_string: string;
  fork_db_head_block_num: number;
  fork_db_head_block_id: string;
  server_full_version_string: string;
  total_cpu_weight: number;
  total_net_weight: number;
  earliest_available_block_num: number;
  last_irreversible_block_time: string;
};

export type ResponseExchangeRates = {
  PBTC: number;
  LIBRE: number;
  PUSDT: number;
  BTCLIB: number;
  BTCUSD: number;
};

export type ParamsLastTransactions = {
  limit: number;
  sort: 'desc' | 'asc';
  simple: boolean;
  account?: string;
};

export type ParamsGetAccount = {
  account?: string;
};

export type ParamsGetActions = {
  account?: string;
  skip?: number;
  limit?: number;
};

export type ParamsGetTransaction = {
  id: string;
};

export type ResponseLastSwapTransactions = {
  query_time_ms: number;
  cached: boolean;
  lib: number;
  total: {
    value: number;
    relation: string;
  };
  simple_actions: {
    block: number;
    timestamp: Date;
    contract: string;
    action: string;
    actors: string;
    notified: string;
    transaction_id: string;
    data: {
      from?: string;
      to?: string;
      amount?: number;
      symbol?: string;
      quantity?: string;
      memo?: string;
      user?: string;
      ext_symbol?: {
        sym: string;
        contract: string;
      };
      to_buy?: string;
      max_asset1?: string;
      max_asset2?: string;
    };
  }[];
};

export type ResponseLastTransactions = {
  query_time_ms: number;
  cached: boolean;
  lib: number;
  total: {
    value: number;
    relation: string;
  };
  simple_actions: {
    block: number;
    timestamp: string;
    contract: string;
    action: string;
    actors: string;
    notified: string;
    transaction_id: string;
    data: {
      account: string;
      name: string;
      authorization: {
        actor: string;
        permission: string;
      }[];
      data: {
        header: {
          timestamp: number;
          producer: string;
          confirmed: number;
          previous: string;
          transaction_mroot: string;
          action_mroot: string;
          schedule_version: number;
          new_producers: any;
        };
      };
    };
  }[];
};

export type ResponseGetAccount = {
  query_time_ms: number;
  account: {
    account_name: string;
    head_block_num: number;
    head_block_time: Date;
    privileged: boolean;
    last_code_update: Date;
    created: Date;
    core_liquid_balance: string;
    ram_quota: number;
    net_weight: number;
    cpu_weight: number;
    net_limit: Limit;
    cpu_limit: Limit;
    ram_usage: number;
    permissions: {
      perm_name: string;
      parent: string;
      required_auth: {
        threshold: number;
        keys: {
          key: string;
          weight: number;
        }[];
        accounts: any[];
        waits: any[];
      };
    }[];
    total_resources: null;
    self_delegated_bandwidth: null;
    refund_request: null;
    voter_info: {
      owner: string;
      proxy: string;
      producers: string[];
      staked: string;
    };
    rex_info: null;
    subjective_cpu_bill_limit: {
      used: number;
      available: number;
      max: number;
    };
  };
  links: any[];
  tokens: {
    symbol: keyof ResponseExchangeRates;
    precision: number;
    amount: number;
    contract: string;
  }[];
  total_actions: number;
  actions: {
    '@timestamp': Date;
    timestamp: Date;
    block_num: number;
    trx_id: string;
    act: {
      account: string;
      name: string;
      authorization: {
        actor: string;
        permission: string;
      }[];
      data: {
        from?: string;
        to?: string;
        amount?: number;
        symbol?: keyof ResponseExchangeRates;
        quantity?: string;
        memo?: string;
        account?: string;
        pool?: string;
        index?: string;
      };
    };
    notified: string[];
    cpu_usage_us?: number;
    net_usage_words?: number;
    global_sequence: number;
    producer: string;
    action_ordinal: number;
    creator_action_ordinal: number;
    signatures?: string[];
  }[];
};

export type ResponseGetActions = {
  query_time_ms: number;
  cached: boolean;
  lib: number;
  total: {
    value: number;
    relation: string;
  };
  actions: {
    '@timestamp': string;
    timestamp: string;
    block_num: number;
    trx_id: string;
    act: {
      account: string;
      name: string;
      authorization: {
        actor: string;
        permission: string;
      }[];
      data: {
        from: string;
        to: string;
        amount: number;
        symbol: string;
        quantity: string;
        memo: string;
      };
    };
    notified: string[];
    cpu_usage_us: number;
    net_usage_words: number;
    global_sequence: number;
    producer: string;
    action_ordinal: number;
    creator_action_ordinal: number;
    signatures: string[];
    account_ram_deltas?: {
      account: string;
      delta: number;
    }[];
  }[];
};

export type ResponseGetTransaction = {
  query_time_ms: number;
  executed: boolean;
  trx_id: string;
  lib: number;
  cached_lib: boolean;
  actions: {
    action_ordinal: number;
    creator_action_ordinal: number;
    act: {
      account: string;
      name: string;
      authorization: {
        actor: string;
        permission: string;
      }[];
      data: {
        from: string;
        to: string;
        amount: number;
        symbol: string;
        quantity: string;
        memo: string;
      };
    };
    context_free: boolean;
    elapsed: string;
    return_value: string;
    '@timestamp': Date;
    block_num: number;
    producer: string;
    trx_id: string;
    global_sequence: number;
    cpu_usage_us: number;
    net_usage_words: number;
    signatures: string[];
    inline_count: number;
    inline_filtered: boolean;
    receipts: {
      receiver: string;
      global_sequence: string;
      recv_sequence: string;
      auth_sequence: {
        account: string;
        sequence: string;
      }[];
    }[];
    code_sequence: number;
    abi_sequence: number;
    notified: string[];
    timestamp: Date;
  }[];
};

export type ResponseGetProducers = {
  url: string;
  rank: number;
  name: string;
  location: string;
  totalVotes: number;
  percentage: string;
}[];

export type ResponseGetTokens = {
  rank: number;
  name: string;
  symbol: ReactNode;
  supply: number;
  marketCap: number;
  icon: string;
}[];

export type ResponseGetDefillama = string;

export type ParamsGetBlock = {
  block_num_or_id: string;
};

export type ResponseGetBlock = {
  timestamp: string;
  producer: string;
  confirmed: number;
  previous: string;
  transaction_mroot: string;
  action_mroot: string;
  schedule_version: number;
  new_producers: null;
  producer_signature: string;
  transactions: {
    status: string;
    cpu_usage_us: number;
    net_usage_words: number;
    trx: {
      id: string;
      signatures: string[];
      compression: string;
      packed_context_free_data: string;
      context_free_data: any[];
      packed_trx: string;
      transaction: {
        expiration: string;
        ref_block_num: number;
        ref_block_prefix: number;
        max_net_usage_words: number;
        max_cpu_usage_ms: number;
        delay_sec: number;
        context_free_actions: any[];
        actions: {
          account: string;
          name: string;
          authorization: {
            actor: string;
            permission: string;
          }[];
          data: {
            from: string;
            to: string;
            quantity: string;
            memo: string;
          };
          hex_data: string;
        }[];
      };
    };
  }[];
  id: string;
  block_num: number;
  ref_block_prefix: number;
};

export type ResponseOrdinalsMarketcap = {
  stats: {
    tradingVolume: number;
    libreAccounts: number;
    brcTokenCount: number;
    inscriptionCount: number;
    btcAddressCount: number;
  };
  tokens: {
    name: string;
    mappedName: string;
    price: number;
    volume: number;
    change24h: number | null;
    libreHolderCount: number;
    totalSupply: number;
    marketCap: number;
    bitcoinHolderCount: number;
  }[];
};

export type ParamsGetAccountTokens = {
  account: string;
  limit?: number;
};

export type ResponseGetAccountTokens = {
  account: string;
  tokens: {
    symbol: keyof ResponseExchangeRates;
    precision: number;
    amount: number;
    contract: string;
  }[];
};

const API_URLS = [
  {
    key: "mainnet",
    label: "Mainnet",
    url: process.env.NEXT_PUBLIC_MAINNET_API,
    default: true,
  },
  {
    key: "testnet",
    label: "Testnet",
    url: process.env.NEXT_PUBLIC_TESTNET_API,
  },
];

export default API_URLS;

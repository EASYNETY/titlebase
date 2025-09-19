export const SUPPORTED_TOKENS = {
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    address: "0x0000000000000000000000000000000000000000", // Native ETH
    icon: "/crypto-icons/eth.svg",
  },
  USDC: {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base USDC
    icon: "/crypto-icons/usdc.svg",
  },
  USDT: {
    symbol: "USDT",
    name: "Tether USD",
    decimals: 6,
    address: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2", // Base USDT
    icon: "/crypto-icons/usdt.svg",
  },
  DAI: {
    symbol: "DAI",
    name: "Dai Stablecoin",
    decimals: 18,
    address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb", // Base DAI
    icon: "/crypto-icons/dai.svg",
  },
  BUSD: {
    symbol: "BUSD",
    name: "Binance USD",
    decimals: 18,
    address: "0x4Fabb145d64652a948d72533023f6E7A623C7C53", // Base BUSD
    icon: "/crypto-icons/busd.svg",
  },
  EUROC: {
    symbol: "EUROC",
    name: "Euro Coin",
    decimals: 6,
    address: "0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c", // Base EUROC
    icon: "/crypto-icons/euroc.svg",
  },
} as const

export const PAYMENT_METHODS = {
  // Crypto
  CRYPTO: "crypto",
  WALLET_CONNECT: "wallet_connect",
  COINBASE_WALLET: "coinbase_wallet",
  METAMASK: "metamask",
  PHANTOM: "phantom",
  SOLFLARE: "solflare",
  LEDGER: "ledger",
  TREZOR: "trezor",

  // Fiat - Cards
  CREDIT_CARD: "credit_card",
  DEBIT_CARD: "debit_card",
  APPLE_PAY: "apple_pay",
  GOOGLE_PAY: "google_pay",
  SAMSUNG_PAY: "samsung_pay",

  // Fiat - Bank
  BANK_TRANSFER: "bank_transfer",
  ACH: "ach",
  SEPA: "sepa",
  SWIFT: "swift",
  FASTER_PAYMENTS: "faster_payments",

  // Fiat - Digital Wallets
  PAYPAL: "paypal",
  VENMO: "venmo",
  CASH_APP: "cash_app",
  ZELLE: "zelle",

  // Buy Now Pay Later
  KLARNA: "klarna",
  AFTERPAY: "afterpay",
  AFFIRM: "affirm",
} as const

export const ESCROW_PERIODS = {
  STANDARD: 7 * 24 * 60 * 60, // 7 days in seconds
  EXPRESS: 3 * 24 * 60 * 60, // 3 days in seconds
  EXTENDED: 14 * 24 * 60 * 60, // 14 days in seconds
} as const

export const WALLET_CONFIGS = {
  walletconnect: {
    name: "WalletConnect",
    type: "mobile",
    description: "Connect any mobile wallet",
    supportedChains: ["base", "ethereum", "polygon"],
  },
  coinbase_wallet: {
    name: "Coinbase Wallet",
    type: "mobile",
    description: "Direct Coinbase integration",
    supportedChains: ["base", "ethereum"],
  },
  metamask: {
    name: "MetaMask",
    type: "browser",
    description: "Popular browser extension",
    supportedChains: ["base", "ethereum", "polygon"],
  },
  phantom: {
    name: "Phantom",
    type: "browser",
    description: "Solana and multi-chain wallet",
    supportedChains: ["solana", "ethereum"],
  },
  ledger: {
    name: "Ledger",
    type: "hardware",
    description: "Hardware wallet security",
    supportedChains: ["base", "ethereum", "solana"],
  },
  trezor: {
    name: "Trezor",
    type: "hardware",
    description: "Open-source hardware wallet",
    supportedChains: ["base", "ethereum"],
  },
} as const

export const PAYMENT_FEES = {
  crypto: { percentage: 0, fixed: 0 }, // No fees for crypto
  credit_card: { percentage: 2.9, fixed: 0.3 },
  bank_transfer: { percentage: 0, fixed: 5.0 },
  digital_wallet: { percentage: 3.5, fixed: 0 },
  mobile_payment: { percentage: 2.9, fixed: 0 },
} as const

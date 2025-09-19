import { createPublicClient, http, createWalletClient, custom } from "viem"
import { base, baseSepolia } from "viem/chains"

// Account Abstraction configuration for ERC-4337
export const AA_CONFIG = {
  bundlerUrl: process.env.NEXT_PUBLIC_BUNDLER_URL || "https://api.pimlico.io/v2/base/rpc",
  paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL || "https://api.pimlico.io/v2/base/rpc",
  entryPointAddress: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789" as const,
  accountFactoryAddress: "0x9406Cc6185a346906296840746125a0E44976454" as const,
}

export const publicClient = createPublicClient({
  chain: process.env.NODE_ENV === "production" ? base : baseSepolia,
  transport: http(),
})

export const createAAWalletClient = (account: `0x${string}`) => {
  return createWalletClient({
    account,
    chain: process.env.NODE_ENV === "production" ? base : baseSepolia,
    transport: custom(window.ethereum),
  })
}

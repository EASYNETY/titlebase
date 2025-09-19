import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { base, baseSepolia } from "wagmi/chains"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

if (!projectId) {
  console.warn("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. Wallet functionality may be limited.")
}

export const config = getDefaultConfig({
  appName: "TitleBase - Title NFT Marketplace",
  projectId: projectId || "2f05a7cdc1588bc900adc5b17a2b8e32",
  chains: [base, baseSepolia],
  ssr: true,
  appDescription: "Fractional real estate investment platform powered by NFTs",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  appIcon: "/favicon.ico",
})

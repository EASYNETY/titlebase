"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Wallet, Smartphone, Shield, HardDrive, ExternalLink } from "lucide-react"

interface WalletOption {
  id: string
  name: string
  icon: string
  description: string
  category: "mobile" | "browser" | "hardware" | "institutional"
  isPopular?: boolean
  isRecommended?: boolean
}

const WALLET_OPTIONS: WalletOption[] = [
  // Mobile Wallets
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "🔗",
    description: "Connect any mobile wallet (Trust, Rainbow, Coinbase)",
    category: "mobile",
    isPopular: true,
  },
  {
    id: "coinbase_wallet",
    name: "Coinbase Wallet",
    icon: "🔵",
    description: "Direct integration with Coinbase ecosystem",
    category: "mobile",
    isRecommended: true,
  },
  {
    id: "trust_wallet",
    name: "Trust Wallet",
    icon: "🛡️",
    description: "Popular mobile crypto wallet",
    category: "mobile",
  },
  {
    id: "rainbow",
    name: "Rainbow",
    icon: "🌈",
    description: "Ethereum wallet with DeFi focus",
    category: "mobile",
  },

  // Browser Extensions
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    description: "Most popular Ethereum browser wallet",
    category: "browser",
    isPopular: true,
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "👻",
    description: "Solana wallet with multi-chain support",
    category: "browser",
  },
  {
    id: "solflare",
    name: "Solflare",
    icon: "☀️",
    description: "Solana-focused wallet solution",
    category: "browser",
  },

  // Hardware Wallets
  {
    id: "ledger",
    name: "Ledger",
    icon: "🔐",
    description: "Hardware wallet for maximum security",
    category: "hardware",
    isRecommended: true,
  },
  {
    id: "trezor",
    name: "Trezor",
    icon: "🔒",
    description: "Open-source hardware wallet",
    category: "hardware",
  },

  // Institutional
  {
    id: "gnosis_safe",
    name: "Gnosis Safe",
    icon: "🏛️",
    description: "Multi-signature wallet for institutions",
    category: "institutional",
  },
]

interface WalletSelectionProps {
  onWalletSelect: (walletId: string) => void
  isConnecting?: boolean
  selectedWallet?: string
}

export function WalletSelection({ onWalletSelect, isConnecting, selectedWallet }: WalletSelectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", name: "All Wallets", icon: Wallet },
    { id: "mobile", name: "Mobile", icon: Smartphone },
    { id: "browser", name: "Browser", icon: ExternalLink },
    { id: "hardware", name: "Hardware", icon: HardDrive },
    { id: "institutional", name: "Institutional", icon: Shield },
  ]

  const filteredWallets =
    selectedCategory === "all"
      ? WALLET_OPTIONS
      : WALLET_OPTIONS.filter((wallet) => wallet.category === selectedCategory)

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            <category.icon className="w-4 h-4" />
            {category.name}
          </Button>
        ))}
      </div>

      <Separator />

      {/* Wallet Options */}
      <div className="grid gap-3">
        {filteredWallets.map((wallet) => (
          <Card
            key={wallet.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedWallet === wallet.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onWalletSelect(wallet.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{wallet.icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{wallet.name}</h3>
                      {wallet.isPopular && <Badge className="bg-blue-100 text-blue-800 text-xs">Popular</Badge>}
                      {wallet.isRecommended && (
                        <Badge className="bg-green-100 text-green-800 text-xs">Recommended</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{wallet.description}</p>
                  </div>
                </div>

                {isConnecting && selectedWallet === wallet.id && (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-blue-900">Secure Connection</p>
              <p className="text-sm text-blue-700">
                All wallet connections are encrypted and secure. We never store your private keys or seed phrases.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

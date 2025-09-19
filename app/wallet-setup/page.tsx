import { WalletConnectSetup } from "@/components/wallet-connect-setup"

export default function WalletSetupPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Wallet Configuration</h1>
        <p className="text-muted-foreground">Configure WalletConnect to enable wallet functionality</p>
      </div>
      <WalletConnectSetup />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/hooks/use-auth"
import { KYCModal } from "@/components/auth/kyc-modal"
import { canProceed } from "@/lib/auth/policies"
import { Shield, Wallet, Loader2 } from "lucide-react"

interface WithdrawTBAProps {
  balanceEth: number
  onSuccess?: (tx?: { hash?: string }) => void
}

export function WithdrawTBA({ balanceEth, onSuccess }: WithdrawTBAProps) {
  const { user, ensureSmartAccount } = useAuth()
  const [kycOpen, setKycOpen] = useState(false)
  const [working, setWorking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | undefined>(undefined)

  const handleWithdraw = async () => {
    setError(null)

    // Gate only at withdrawal
    const policy = canProceed("withdraw_tba", {
      isKYCVerified: Boolean(user?.isKYCVerified),
      hasWalletLinked: Boolean(user?.address),
      hasSmartAccount: Boolean(user?.smartAccountAddress),
    })

    if (!policy.allowed && policy.reason === "kyc_required") {
      setKycOpen(true)
      return
    }

    try {
      setWorking(true)

      // Ensure the user has a smart account for gasless/account‑abstracted ops
      const smart = await ensureSmartAccount()

      // Call backend to execute the actual withdrawal from the TBA/smart account
      // Replace with your real endpoint; this is a placeholder demo route.
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/tba/withdraw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              typeof window !== "undefined" ? `Bearer ${localStorage.getItem("auth-token") || ""}` : "",
          },
          body: JSON.stringify({ amountEth: balanceEth, smartAccount: smart }),
        },
      )

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.error || "Withdrawal failed")
      }

      setTxHash(data?.txHash)
      onSuccess?.({ hash: data?.txHash })
    } catch (e: any) {
      setError(e?.message || "Something went wrong")
    } finally {
      setWorking(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Withdrawable TBA Balance</p>
            <p className="text-2xl font-semibold">{balanceEth.toFixed(4)} ETH</p>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">KYC required at withdrawal</span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {txHash && (
          <Alert>
            <AlertDescription>
              Withdrawal submitted. Tx:{" "}
              <a
                href={`https://basescan.org/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {txHash.slice(0, 10)}...
              </a>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center gap-3">
          <Button onClick={handleWithdraw} disabled={working || balanceEth <= 0}>
            {working ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" /> Withdraw
              </>
            )}
          </Button>
          <span className="text-xs text-muted-foreground">Funds move from your TBA to your payout wallet.</span>
        </div>
      </CardContent>

      {/* KYC-on-withdraw modal */}
      <KYCModal isOpen={kycOpen} onClose={() => setKycOpen(false)} />
    </Card>
  )
}
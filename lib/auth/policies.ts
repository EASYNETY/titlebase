export type PolicyAction =
  | "withdraw_tba"
  | "buy_nft"
  | "place_bid"
  | "list_property"
  | "edit_profile"
  | "link_wallet"

export interface PolicyContext {
  isKYCVerified: boolean
  hasWalletLinked: boolean
  hasSmartAccount: boolean
}

/**
 * Business rules
 * - KYC is required only when withdrawing TBA funds
 * - Wallet linking is optional for most users; only power features may suggest it
 */
export function requiresKyc(action: PolicyAction): boolean {
  return action === "withdraw_tba"
}

export function requiresWalletLink(action: PolicyAction): boolean {
  // Keep wallet optional; power features might recommend but not block by default
  return action === "list_property"
}

export function canProceed(action: PolicyAction, ctx: PolicyContext): { allowed: boolean; reason?: string } {
  if (requiresKyc(action) && !ctx.isKYCVerified) {
    return { allowed: false, reason: "kyc_required" }
  }
  if (requiresWalletLink(action) && !ctx.hasWalletLinked) {
    return { allowed: false, reason: "wallet_link_recommended" }
  }
  return { allowed: true }
}
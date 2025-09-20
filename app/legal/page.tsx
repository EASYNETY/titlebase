import type { Metadata } from "next"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Legal & Privacy | TitleBase",
  description: "Privacy Policy, Terms of Service, and Cookie Policy for TitleBase.",
}

export default function LegalPage() {
  const updated = "20 September 2025"

  return (
    <main className="container mx-auto px-4 py-10 space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Legal & Privacy</h1>
        <p className="text-muted-foreground">Last updated: {updated}</p>
      </section>

      <section id="privacy" className="space-y-4 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Privacy Policy</h2>
        <p className="text-sm text-muted-foreground">
          We collect minimal personal information necessary to provide our marketplace services, including account
          details, wallet addresses, and activity needed for security and compliance. We do not sell your data. We
          retain data only as long as required for legal, accounting, or service continuity purposes.
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Account data: name, email, wallet address, role, permissions.</li>
          <li>Security data: device, IP, logs for fraud prevention and audit.</li>
          <li>Payment data: limited metadata related to transactions (no card storage).</li>
        </ul>
      </section>

      <Separator />

      <section id="terms" className="space-y-4 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Terms of Service</h2>
        <p className="text-sm text-muted-foreground">
          By using TitleBase, you agree to our platform rules and applicable laws. Listings may carry risk; do your own
          due diligence. We may suspend accounts for abuse or policy violations. Some features require KYC and
          jurisdictional compliance.
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>You are responsible for safeguarding your wallet and credentials.</li>
          <li>Auctions are binding; winning bids may incur fees specified at checkout.</li>
          <li>Disputes are handled according to our escrow and dispute policies.</li>
        </ul>
      </section>

      <Separator />

      <section id="cookies" className="space-y-4 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Cookie Policy</h2>
        <p className="text-sm text-muted-foreground">
          We use essential cookies for authentication and session management and limited analytics to improve the user
          experience. You can adjust cookie preferences in your browser. Blocking essential cookies may break login.
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Essential: session, security, CSRF protection.</li>
          <li>Optional: product analytics and performance metrics.</li>
        </ul>
      </section>
    </main>
  )
}
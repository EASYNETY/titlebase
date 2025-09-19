import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

import { Header } from "@/components/layout/header"
import { Providers } from "./providers"
import { MonacoEditorSetup } from "@/components/monaco-editor-setup"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "TitleBase - Professional Real Estate Investment Platform",
  description:
    "Access institutional-grade real estate investments with fractional ownership, automated distributions, and comprehensive analytics. Start investing with as little as $100.",
  keywords: "real estate investment, fractional ownership, REIT, property investment, passive income, blockchain, NFT",
  authors: [{ name: "TitleBase" }],
  openGraph: {
    title: "TitleBase - Professional Real Estate Investment Platform",
    description:
      "Access institutional-grade real estate investments with fractional ownership and automated distributions.",
    type: "website",
    locale: "en_NZ", // Updated locale to New Zealand
  },
  twitter: {
    card: "summary_large_image",
    title: "TitleBase - Professional Real Estate Investment Platform",
    description:
      "Access institutional-grade real estate investments with fractional ownership and automated distributions.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} flex flex-col min-h-screen`}>
        <MonacoEditorSetup />
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>
            <Header />
            <main className="flex-1">{children}</main>
            <Toaster />
            <Footer />
          </Providers>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}

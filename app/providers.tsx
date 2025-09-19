"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit"
import { useTheme } from "next-themes"
import { config } from "@/lib/config/wagmi"
import { AuthProvider } from "@/lib/hooks/use-auth"
import { useState } from "react"

// import "@rainbow-me/rainbowkit/styles.css"

function RainbowKitWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <RainbowKitProvider
      config={config}
      theme={theme === "dark" ? darkTheme() : lightTheme()}
      appInfo={{
        appName: "TitleBase",
        learnMoreUrl: "https://rainbowkit.com",
      }}
    >
      {children}
    </RainbowKitProvider>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitWrapper>
            <AuthProvider>{children}</AuthProvider>
          </RainbowKitWrapper>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  )
}

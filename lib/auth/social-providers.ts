export interface SocialProvider {
  id: string
  name: string
  icon: string
  getAuthUrl: () => string
  handleCallback: (code: string) => Promise<{ user: any; tokens: any }>
}

// Import the API client
import { authApi } from "@/lib/api/client"

export const socialProviders: Record<string, SocialProvider> = {
  google: {
    id: "google",
    name: "Google",
    icon: "🔍",
    getAuthUrl: () => {
      const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        redirect_uri: `${window.location.origin}/auth/callback/google`,
        response_type: "code",
        scope: "openid email profile",
        state: crypto.randomUUID(),
      })
      return `https://accounts.google.com/o/oauth2/v2/auth?${params}`
    },
    handleCallback: async (code: string) => {
      const result = await authApi.googleCallback(code) as any
      return { user: result.user, tokens: { access_token: result.token } }
    },
  },
  twitter: {
    id: "twitter",
    name: "Twitter",
    icon: "🐦",
    getAuthUrl: () => {
      const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID!,
        redirect_uri: `${window.location.origin}/auth/callback/twitter`,
        response_type: "code",
        scope: "tweet.read users.read",
        state: crypto.randomUUID(),
        code_challenge: "challenge",
        code_challenge_method: "plain",
      })
      return `https://twitter.com/i/oauth2/authorize?${params}`
    },
    handleCallback: async (code: string) => {
      const response = await fetch("/api/auth/twitter/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
      return response.json()
    },
  },
  discord: {
    id: "discord",
    name: "Discord",
    icon: "🎮",
    getAuthUrl: () => {
      const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
        redirect_uri: `${window.location.origin}/auth/callback/discord`,
        response_type: "code",
        scope: "identify email",
        state: crypto.randomUUID(),
      })
      return `https://discord.com/api/oauth2/authorize?${params}`
    },
    handleCallback: async (code: string) => {
      const response = await fetch("/api/auth/discord/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
      return response.json()
    },
  },
}

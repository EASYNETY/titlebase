/** @type {import('next').NextConfig} */
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const apiOrigin = (() => {
  try {
    return apiUrl ? new URL(apiUrl).origin : ''
  } catch {
    return ''
  }
})()

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://api.v0.dev https://vercel.live https://vercel.com https://pulse.walletconnect.org https://api.web3modal.org;
              connect-src 'self' ${apiOrigin ? `${apiOrigin} ` : ''} http://localhost:5000 http://3.80.241.11:5000 https://api.v0.dev https://v0.dev https://v0.app https://v0chat.vercel.sh https://vercel.live/ https://vercel.com https://*.pusher.com/ https://blob.vercel-storage.com https://*.blob.vercel-storage.com https://blobs.vusercontent.net wss://*.pusher.com/ https://fides-vercel.us.fides.ethyca.com/api/v1/ https://cdn-api.ethyca.com/location https://privacy-vercel.us.fides.ethyca.com/api/v1/ https://api.getkoala.com https://*.sentry.io/api/ data: blob: https://pulse.walletconnect.org https://api.web3modal.org https://cca-lite.coinbase.com https://*.coinbase.com https://relay.walletconnect.com wss://relay.walletconnect.com https://relay.walletconnect.org wss://relay.walletconnect.org https://*.walletconnect.com wss://*.walletconnect.com;
              worker-src 'self' blob: data:;
              child-src 'self' blob: data:;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob: https: https://cca-lite.coinbase.com;
              font-src 'self' data:;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiOrigin || 'http://localhost:5000'}/api/:path*`,
      },
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      }
    }
    return config
  }
}

export default nextConfig

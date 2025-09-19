import { type NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "@/lib/auth/jwt"
import { ethers } from "ethers"

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await verifyJWT(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const { tbaAddress, to, amount, nonce } = body

    // Validate voucher data
    if (!tbaAddress || !to || !amount || nonce === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify user owns the TBA or has permission
    // This would check the NFT ownership in a real implementation

    // Create voucher hash
    const domain = {
      name: "TitleNFT TBA",
      version: "1",
      chainId: 8453, // Base mainnet
      verifyingContract: tbaAddress,
    }

    const types = {
      Voucher: [
        { name: "to", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "nonce", type: "uint256" },
      ],
    }

    const value = {
      to,
      amount,
      nonce,
    }

    // Sign voucher with server key (in production, use HSM or secure key management)
    const privateKey = process.env.VOUCHER_SIGNER_PRIVATE_KEY
    if (!privateKey) {
      return NextResponse.json({ error: "Voucher signing not configured" }, { status: 500 })
    }

    const wallet = new ethers.Wallet(privateKey)
    const signature = await wallet.signTypedData(domain, types, value)

    const voucher = {
      to,
      amount,
      nonce,
      signature,
      signer: wallet.address,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ voucher })
  } catch (error) {
    console.error("Voucher signing error:", error)
    return NextResponse.json({ error: "Failed to sign voucher" }, { status: 500 })
  }
}

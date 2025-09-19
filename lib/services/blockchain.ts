import { ethers } from "ethers"

export class BlockchainService {
  private provider: ethers.JsonRpcProvider
  private marketplaceContract: ethers.Contract
  private nftContract: ethers.Contract

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL)

    // Initialize contracts (mock ABIs - replace with actual)
    const marketplaceABI = [
      "function createListing(uint256 tokenId, uint256 price, uint256 duration) external",
      "function buyNow(uint256 tokenId) external payable",
      "function placeBid(uint256 tokenId, uint256 amount) external payable",
      "event ListingCreated(uint256 indexed tokenId, address indexed seller, uint256 price)",
      "event Sale(uint256 indexed tokenId, address indexed buyer, uint256 price)",
    ]

    const nftABI = [
      "function ownerOf(uint256 tokenId) external view returns (address)",
      "function tokenURI(uint256 tokenId) external view returns (string)",
      "function approve(address to, uint256 tokenId) external",
      "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
    ]

    this.marketplaceContract = new ethers.Contract(
      process.env.MARKETPLACE_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
      marketplaceABI,
      this.provider,
    )

    this.nftContract = new ethers.Contract(
      process.env.NFT_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
      nftABI,
      this.provider,
    )
  }

  async getTokenOwner(tokenId: string): Promise<string> {
    try {
      return await this.nftContract.ownerOf(tokenId)
    } catch (error) {
      console.error("Error getting token owner:", error)
      throw error
    }
  }

  async getTokenMetadata(tokenId: string): Promise<string> {
    try {
      return await this.nftContract.tokenURI(tokenId)
    } catch (error) {
      console.error("Error getting token metadata:", error)
      throw error
    }
  }

  async getTransactionReceipt(txHash: string) {
    try {
      return await this.provider.getTransactionReceipt(txHash)
    } catch (error) {
      console.error("Error getting transaction receipt:", error)
      throw error
    }
  }

  async getBlockNumber(): Promise<number> {
    try {
      return await this.provider.getBlockNumber()
    } catch (error) {
      console.error("Error getting block number:", error)
      throw error
    }
  }
}

export const blockchainService = new BlockchainService()

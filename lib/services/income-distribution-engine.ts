import { ethers } from "ethers"

export interface DistributionSchedule {
  id: string
  propertyId: string
  distributionType: "monthly" | "quarterly" | "annual" | "one-time"
  amount: number
  currency: string
  scheduledDate: Date
  status: "pending" | "processing" | "completed" | "failed"
  eligibleInvestors: number
  totalShares: number
  revenuePerShare: number
}

export interface InvestorPayout {
  investorAddress: string
  propertyId: string
  shares: number
  payoutAmount: number
  distributionId: string
  status: "pending" | "processing" | "completed" | "failed"
  transactionHash?: string
  processedAt?: Date
}

export interface DistributionMetrics {
  totalDistributed: number
  totalInvestors: number
  averageYield: number
  distributionFrequency: number
  successRate: number
  pendingDistributions: number
}

export class IncomeDistributionEngine {
  private provider: ethers.JsonRpcProvider
  private distributionContract: ethers.Contract

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL)

    // Initialize distribution contract
    const distributionABI = [
      "function batchDistribute(address[] calldata investors, uint256[] calldata amounts, address token) external",
      "function scheduleDistribution(uint256 propertyId, uint256 totalAmount, uint256 scheduledTime) external",
      "function claimDistribution(uint256 propertyId) external",
      "function getDistributionInfo(uint256 propertyId) external view returns (uint256, uint256, uint256)",
      "event DistributionScheduled(uint256 indexed propertyId, uint256 totalAmount, uint256 scheduledTime)",
      "event DistributionProcessed(uint256 indexed propertyId, uint256 totalAmount, uint256 investorCount)",
      "event PayoutClaimed(address indexed investor, uint256 indexed propertyId, uint256 amount)",
    ]

    this.distributionContract = new ethers.Contract(
      process.env.DISTRIBUTION_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
      distributionABI,
      this.provider,
    )
  }

  async scheduleDistribution(
    propertyId: string,
    totalRevenue: number,
    distributionType: "monthly" | "quarterly" | "annual" | "one-time",
    scheduledDate?: Date,
  ): Promise<DistributionSchedule> {
    try {
      // Get property and investor data
      const propertyData = await this.getPropertyData(propertyId)
      const investors = await this.getPropertyInvestors(propertyId)

      const revenuePerShare = totalRevenue / propertyData.totalShares
      const distributionId = `dist_${propertyId}_${Date.now()}`

      const schedule: DistributionSchedule = {
        id: distributionId,
        propertyId,
        distributionType,
        amount: totalRevenue,
        currency: "USD",
        scheduledDate: scheduledDate || new Date(),
        status: "pending",
        eligibleInvestors: investors.length,
        totalShares: propertyData.totalShares,
        revenuePerShare,
      }

      // Store in database
      await this.saveDistributionSchedule(schedule)

      return schedule
    } catch (error) {
      console.error("Error scheduling distribution:", error)
      throw new Error("Failed to schedule distribution")
    }
  }

  async processDistribution(distributionId: string): Promise<InvestorPayout[]> {
    try {
      const schedule = await this.getDistributionSchedule(distributionId)
      if (!schedule) throw new Error("Distribution schedule not found")

      // Update status to processing
      await this.updateDistributionStatus(distributionId, "processing")

      const investors = await this.getPropertyInvestors(schedule.propertyId)
      const payouts: InvestorPayout[] = []

      // Calculate individual payouts
      for (const investor of investors) {
        const payoutAmount = investor.shares * schedule.revenuePerShare

        const payout: InvestorPayout = {
          investorAddress: investor.address,
          propertyId: schedule.propertyId,
          shares: investor.shares,
          payoutAmount,
          distributionId,
          status: "pending",
        }

        payouts.push(payout)
      }

      // Process batch distribution
      const result = await this.executeBatchDistribution(payouts)

      // Update distribution status
      await this.updateDistributionStatus(distributionId, "completed")

      return result
    } catch (error) {
      console.error("Error processing distribution:", error)
      await this.updateDistributionStatus(distributionId, "failed")
      throw new Error("Failed to process distribution")
    }
  }

  async executeBatchDistribution(payouts: InvestorPayout[]): Promise<InvestorPayout[]> {
    try {
      const addresses = payouts.map((p) => p.investorAddress)
      const amounts = payouts.map((p) => ethers.parseEther(p.payoutAmount.toString()))

      // Execute blockchain transaction
      const tx = await this.distributionContract.batchDistribute(
        addresses,
        amounts,
        ethers.ZeroAddress, // ETH distribution
      )

      const receipt = await tx.wait()

      // Update payout records with transaction hash
      const updatedPayouts = payouts.map((payout) => ({
        ...payout,
        status: "completed" as const,
        transactionHash: receipt.hash,
        processedAt: new Date(),
      }))

      // Save payout records to database
      await this.savePayoutRecords(updatedPayouts)

      return updatedPayouts
    } catch (error) {
      console.error("Error executing batch distribution:", error)

      // Mark payouts as failed
      const failedPayouts = payouts.map((payout) => ({
        ...payout,
        status: "failed" as const,
      }))

      await this.savePayoutRecords(failedPayouts)
      return failedPayouts
    }
  }

  async calculateYieldMetrics(
    propertyId: string,
    period: "monthly" | "quarterly" | "annual",
  ): Promise<{
    currentYield: number
    averageYield: number
    projectedAnnualYield: number
    totalDistributed: number
    distributionCount: number
  }> {
    try {
      const distributions = await this.getDistributionHistory(propertyId, period)
      const propertyData = await this.getPropertyData(propertyId)

      const totalDistributed = distributions.reduce((sum, dist) => sum + dist.amount, 0)
      const distributionCount = distributions.length

      const averageDistribution = distributionCount > 0 ? totalDistributed / distributionCount : 0
      const currentYield = (averageDistribution / propertyData.totalValue) * 100

      // Project annual yield based on distribution frequency
      let annualMultiplier = 1
      switch (period) {
        case "monthly":
          annualMultiplier = 12
          break
        case "quarterly":
          annualMultiplier = 4
          break
        case "annual":
          annualMultiplier = 1
          break
      }

      const projectedAnnualYield = currentYield * annualMultiplier

      return {
        currentYield,
        averageYield: currentYield,
        projectedAnnualYield,
        totalDistributed,
        distributionCount,
      }
    } catch (error) {
      console.error("Error calculating yield metrics:", error)
      throw new Error("Failed to calculate yield metrics")
    }
  }

  async getInvestorDistributionHistory(investorAddress: string): Promise<InvestorPayout[]> {
    try {
      // Fetch from database - mock implementation
      return []
    } catch (error) {
      console.error("Error fetching investor distribution history:", error)
      throw new Error("Failed to fetch distribution history")
    }
  }

  async getDistributionMetrics(): Promise<DistributionMetrics> {
    try {
      // Calculate platform-wide distribution metrics
      const allDistributions = await this.getAllDistributions()
      const totalDistributed = allDistributions.reduce((sum, dist) => sum + dist.amount, 0)
      const completedDistributions = allDistributions.filter((d) => d.status === "completed")
      const pendingDistributions = allDistributions.filter((d) => d.status === "pending").length

      const successRate =
        allDistributions.length > 0 ? (completedDistributions.length / allDistributions.length) * 100 : 0

      const totalInvestors = await this.getTotalInvestorCount()
      const averageYield = await this.calculatePlatformAverageYield()

      return {
        totalDistributed,
        totalInvestors,
        averageYield,
        distributionFrequency: completedDistributions.length,
        successRate,
        pendingDistributions,
      }
    } catch (error) {
      console.error("Error getting distribution metrics:", error)
      throw new Error("Failed to get distribution metrics")
    }
  }

  // Private helper methods
  private async getPropertyData(propertyId: string) {
    // Mock implementation - replace with actual database query
    return {
      totalValue: 850000,
      totalShares: 1000,
      availableShares: 350,
    }
  }

  private async getPropertyInvestors(propertyId: string) {
    // Mock implementation - replace with actual database query
    return [
      { address: "0x1234...5678", shares: 100 },
      { address: "0x2345...6789", shares: 150 },
      { address: "0x3456...7890", shares: 200 },
    ]
  }

  private async saveDistributionSchedule(schedule: DistributionSchedule) {
    // Save to database
    console.log("Saving distribution schedule:", schedule.id)
  }

  private async getDistributionSchedule(distributionId: string): Promise<DistributionSchedule | null> {
    // Mock implementation
    return null
  }

  private async updateDistributionStatus(distributionId: string, status: DistributionSchedule["status"]) {
    // Update database
    console.log(`Updating distribution ${distributionId} status to ${status}`)
  }

  private async savePayoutRecords(payouts: InvestorPayout[]) {
    // Save to database
    console.log("Saving payout records:", payouts.length)
  }

  private async getDistributionHistory(propertyId: string, period: string) {
    // Mock implementation
    return []
  }

  private async getAllDistributions(): Promise<DistributionSchedule[]> {
    // Mock implementation
    return []
  }

  private async getTotalInvestorCount(): Promise<number> {
    // Mock implementation
    return 0
  }

  private async calculatePlatformAverageYield(): Promise<number> {
    // Mock implementation
    return 0
  }
}

export const incomeDistributionEngine = new IncomeDistributionEngine()

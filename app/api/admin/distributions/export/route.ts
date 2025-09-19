import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { format, filters, dateRange } = body

    const distributionData = [
      {
        id: "DIST-001",
        propertyName: "Sunset Villa",
        distributionType: "rental_income",
        amount: 15420,
        recipientCount: 45,
        status: "pending",
        scheduledDate: "2024-02-01",
        createdAt: "2024-01-25",
      },
      {
        id: "DIST-002",
        propertyName: "Ocean View Condo",
        distributionType: "dividend",
        amount: 8750,
        recipientCount: 32,
        status: "processing",
        scheduledDate: "2024-01-30",
        createdAt: "2024-01-24",
      },
    ]

    const filteredData = distributionData.filter((item) => {
      const matchesStatus = filters.status === "all" || item.status === filters.status
      const matchesType = filters.type === "all" || item.distributionType === filters.type
      return matchesStatus && matchesType
    })

    if (format === "csv") {
      const csvHeaders = "ID,Property Name,Type,Amount,Recipients,Status,Scheduled Date,Created At\n"
      const csvData = filteredData
        .map((item) =>
          [
            item.id,
            item.propertyName,
            item.distributionType,
            item.amount,
            item.recipientCount,
            item.status,
            item.scheduledDate,
            item.createdAt,
          ].join(","),
        )
        .join("\n")

      const csvContent = csvHeaders + csvData

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="distribution-report-${Date.now()}.csv"`,
        },
      })
    }

    if (format === "excel") {
      const excelHeaders = "ID\tProperty Name\tType\tAmount\tRecipients\tStatus\tScheduled Date\tCreated At\n"
      const excelData = filteredData
        .map((item) =>
          [
            item.id,
            item.propertyName,
            item.distributionType.replace("_", " "),
            `$${item.amount.toLocaleString()}`,
            item.recipientCount,
            item.status,
            new Date(item.scheduledDate).toLocaleDateString(),
            new Date(item.createdAt).toLocaleDateString(),
          ].join("\t"),
        )
        .join("\n")

      const excelContent = excelHeaders + excelData

      return new NextResponse(excelContent, {
        headers: {
          "Content-Type": "application/vnd.ms-excel",
          "Content-Disposition": `attachment; filename="distribution-report-${Date.now()}.xls"`,
        },
      })
    }

    if (format === "pdf") {
      const pdfContent = `Distribution Report
Generated: ${new Date().toLocaleDateString()}

Total Distributions: ${filteredData.length}
Total Amount: $${filteredData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}

Distribution Details:
${filteredData
  .map((item) => `${item.id} - ${item.propertyName} - $${item.amount.toLocaleString()} - ${item.status}`)
  .join("\n")}
`

      return new NextResponse(pdfContent, {
        headers: {
          "Content-Type": "text/plain",
          "Content-Disposition": `attachment; filename="distribution-report-${Date.now()}.txt"`,
        },
      })
    }

    return NextResponse.json({ error: "Invalid format" }, { status: 400 })
  } catch (error) {
    console.error("Distribution export error:", error)
    return NextResponse.json({ error: "Failed to generate export" }, { status: 500 })
  }
}

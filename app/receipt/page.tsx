"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function ReceiptPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)

  const propertyTitle = searchParams.get('propertyTitle') || 'Property'
  const amount = searchParams.get('amount') || '0'
  const fractions = searchParams.get('fractions') || '0'
  const totalFractions = searchParams.get('totalFractions') || '1000'
  const transactionId = searchParams.get('id') || 'N/A'
  const timestamp = new Date().toLocaleString()
  const seller = searchParams.get('seller') || 'Seller'

  useEffect(() => {
    setLoading(false)
  }, [])

  const generateReceiptPDF = async () => {
    const element = document.getElementById('receipt-content')
    if (element) {
      const canvas = await html2canvas(element, { scale: 2 })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`receipt-${transactionId}.pdf`)
    }
  }

  const generateReceiptImage = async () => {
    const element = document.getElementById('receipt-content')
    if (element) {
      const canvas = await html2canvas(element, { scale: 2 })
      const link = document.createElement('a')
      link.download = `receipt-${transactionId}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  if (loading) {
    return <div>Loading receipt...</div>
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Purchase Receipt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div id="receipt-content" className="space-y-4 p-6">
              <div className="text-center border-b pb-4">
                <h1 className="text-3xl font-bold">Titlebase NFT Marketplace</h1>
                <p className="text-sm text-muted-foreground mt-1">Fractional Property Ownership Receipt</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Transaction ID:</span>
                  <p>{transactionId}</p>
                </div>
                <div>
                  <span className="font-medium">Date:</span>
                  <p>{timestamp}</p>
                </div>
                <div>
                  <span className="font-medium">Property:</span>
                  <p className="font-semibold">{propertyTitle}</p>
                </div>
                <div>
                  <span className="font-medium">Seller:</span>
                  <p>{seller}</p>
                </div>
                <div>
                  <span className="font-medium">Fractions Purchased:</span>
                  <p>{fractions}</p>
                </div>
                <div>
                  <span className="font-medium">Total Fractions:</span>
                  <p>{totalFractions}</p>
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Amount Paid:</span>
                  <p className="text-2xl font-bold text-primary">{amount} ETH</p>
                </div>
              </div>

              <div className="border-t pt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Thank you for your purchase! Your fractional NFT tokens have been minted and added to your wallet.
                </p>
                <p className="text-xs mt-2">This receipt serves as proof of transaction.</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={generateReceiptPDF} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button onClick={generateReceiptImage} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Image
              </Button>
              <Button onClick={() => window.print()} variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
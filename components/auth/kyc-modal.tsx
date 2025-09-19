"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/hooks/use-auth"

interface KYCModalProps {
  isOpen: boolean
  onClose: () => void
}

export function KYCModal({ isOpen, onClose }: KYCModalProps) {
  const { updateKYCStatus } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    idType: "passport",
    idNumber: "",
    additionalInfo: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/kyc/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        updateKYCStatus(true)
        onClose()
      } else {
        throw new Error("KYC submission failed")
      }
    } catch (error) {
      console.error("KYC submission error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">KYC Verification</DialogTitle>
          <p className="text-muted-foreground">Complete your identity verification to unlock withdrawal capabilities</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Legal Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Residential Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              placeholder="Full address including city, state/province, postal code, country"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="idType">ID Document Type *</Label>
              <select
                id="idType"
                value={formData.idType}
                onChange={(e) => setFormData((prev) => ({ ...prev, idType: e.target.value }))}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
                required
              >
                <option value="passport">Passport</option>
                <option value="drivers_license">Driver's License</option>
                <option value="national_id">National ID</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="idNumber">ID Document Number *</Label>
            <Input
              id="idNumber"
              value={formData.idNumber}
              onChange={(e) => setFormData((prev) => ({ ...prev, idNumber: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => setFormData((prev) => ({ ...prev, additionalInfo: e.target.value }))}
              placeholder="Any additional information you'd like to provide"
            />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Next Steps:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your information will be reviewed within 24-48 hours</li>
              <li>• You may be asked to provide additional documentation</li>
              <li>• KYC verification is required only for withdrawals</li>
              <li>• Your data is encrypted and stored securely</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                "Submit KYC Application"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

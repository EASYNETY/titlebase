"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowRight, Home, TrendingUp, Shield, Zap } from "lucide-react"

interface WelcomeFlowProps {
  onComplete: () => void
}

const steps = [
  {
    id: 1,
    title: "Welcome to TitleBase",
    description: "Your gateway to fractional real estate investing",
    content: "Get started with professional real estate investment in just a few steps.",
  },
  {
    id: 2,
    title: "Complete Your Profile",
    description: "Set up your investor profile and preferences",
    content: "We'll customize your experience based on your investment goals.",
  },
  {
    id: 3,
    title: "Verify Your Identity",
    description: "Quick KYC verification for secure trading",
    content: "This ensures compliance and protects all platform users.",
  },
  {
    id: 4,
    title: "Fund Your Account",
    description: "Add funds to start investing",
    content: "Connect your wallet or add payment methods to begin.",
  },
]

const features = [
  {
    icon: Home,
    title: "Fractional Ownership",
    description: "Own shares of premium real estate properties starting from $100",
  },
  {
    icon: TrendingUp,
    title: "Passive Income",
    description: "Earn monthly dividends from rental income and property appreciation",
  },
  {
    icon: Shield,
    title: "Verified Properties",
    description: "All properties are legally verified with complete title documentation",
  },
  {
    icon: Zap,
    title: "Gasless Trading",
    description: "Trade without gas fees using our smart account technology",
  },
]

export function WelcomeFlow({ onComplete }: WelcomeFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCompletedSteps([...completedSteps, currentStep])
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const currentStepData = steps.find((step) => step.id === currentStep)
  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">R</span>
              </div>
              <span className="text-2xl font-bold">TitleBase</span>
            </div>
            <Progress value={progress} className="w-full max-w-md mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            {currentStep === 1 && (
              <div className="text-center space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{currentStepData?.title}</h2>
                  <p className="text-lg text-muted-foreground mb-8">{currentStepData?.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep > 1 && (
              <div className="text-center space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{currentStepData?.title}</h2>
                  <p className="text-lg text-muted-foreground mb-8">{currentStepData?.description}</p>
                  <p className="text-muted-foreground">{currentStepData?.content}</p>
                </div>

                <div className="flex items-center justify-center gap-4">
                  {completedSteps.map((step) => (
                    <div key={step} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-green-600">Step {step} Complete</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-6">
              <Button variant="ghost" onClick={handleSkip}>
                Skip for now
              </Button>
              <div className="flex gap-2">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                    Back
                  </Button>
                )}
                <Button onClick={handleNext} className="flex items-center gap-2">
                  {currentStep === steps.length ? "Get Started" : "Continue"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

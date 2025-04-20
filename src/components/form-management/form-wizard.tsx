// src/components/form-management/form-wizard.tsx
"use client"

import * as React from "react"
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

type Step = {
  id: string
  title: string
  description?: string
  isOptional?: boolean
}

type FormWizardProps = {
  steps: Step[]
  activeStep: number
  onNext: () => void
  onPrevious: () => void
  onComplete: () => void
  isPending?: boolean
  isStepValid?: boolean
  setIsStepValid?: (isValid: boolean) => void
  className?: string
  children: React.ReactNode
}

export function FormWizard({
  steps,
  activeStep,
  onNext,
  onPrevious,
  onComplete,
  isPending = false,
  isStepValid = true,
  setIsStepValid,
  className,
  children,
}: FormWizardProps) {
  const isLastStep = activeStep === steps.length - 1
  
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-8">
        <StepIndicator
          steps={steps}
          activeStep={activeStep}
          variant="circles"
        />
      </div>
      <CardContent className="p-0">
        {children}
      </CardContent>
      <CardFooter className="flex justify-between gap-2 border-t p-4 mt-6">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={activeStep === 0 || isPending}
        >
          <IconChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <div className="flex gap-2">
          {steps[activeStep].isOptional && (
            <Button
              variant="ghost"
              onClick={isLastStep ? onComplete : onNext}
              disabled={isPending}
            >
              Skip
            </Button>
          )}
          <Button
            onClick={isLastStep ? onComplete : onNext}
            disabled={!isStepValid || isPending}
          >
            {isLastStep ? (
              <>
                Complete
                <IconCheck className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <IconChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </div>
  )
}

type StepIndicatorProps = {
  steps: Step[]
  activeStep: number
  variant?: "circles" | "progress"
  className?: string
}

function StepIndicator({
  steps,
  activeStep,
  variant = "circles",
  className,
}: StepIndicatorProps) {
  if (variant === "progress") {
    return (
      <div className={cn("w-full", className)}>
        <div className="relative flex h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="bg-primary absolute inset-y-0 left-0 transition-all"
            style={{
              width: `${((activeStep + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-2",
        className
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = index < activeStep
        const isCurrent = index === activeStep
        const isUpcoming = index > activeStep

        return (
          <React.Fragment key={step.id}>
            {index > 0 && (
              <div
                className={cn(
                  "h-px flex-1 transition-colors",
                  isCompleted ? "bg-primary" : "bg-secondary"
                )}
              />
            )}
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium ring-4 ring-transparent transition-colors",
                  isCompleted &&
                    "border-primary bg-primary text-primary-foreground",
                  isCurrent &&
                    "border-primary text-primary bg-background",
                  isUpcoming &&
                    "border-secondary text-muted-foreground bg-background"
                )}
              >
                {isCompleted ? (
                  <IconCheck className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}
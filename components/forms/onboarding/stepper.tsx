"use client"

import { cn } from "@/lib/utils"
import { Check, Circle } from "lucide-react"

interface StepperProps {
    steps: string[]
    currentStep: number
    skippedSteps: number[]
}

export function OnboardingStepper({ steps, currentStep, skippedSteps }: StepperProps) {
    return (
        <div className="max-w-xl bg-gray-200/40 w-fit p-2 rounded-xl sm:rounded-full mx-auto mb-8">
            <div className="grid grid-cols-3 gap-4 items-center">
                {steps.map((step, index) => (
                    <div key={step} className="flex items-center w-fit mx-auto justify-center">
                        <div className="relative flex-col-sm-flex-row gap-2 items-center justify-center w-full">
                            <div
                                className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center",
                                    index < currentStep
                                        ? "bg-primary text-primary-foreground"
                                        : index === currentStep
                                            ? "border-2 border-primary"
                                            : "border-2 border-slate-400",
                                )}
                            >
                                {index < currentStep ? (
                                    <Check className="w-4 h-4" />
                                ) : index === currentStep ? (
                                    <></>
                                ) : (
                                    <span className="w-4 h-4" />
                                )}
                            </div>
                            <span
                                className={cn(
                                    "whitespace-nowrap text-[10px] sm:text-xs",
                                    index <= currentStep ? "text-primary font-medium" : "text-muted-foreground",
                                )}
                            >
                                {step}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={cn("w-full h-[2px] mx-2", index < currentStep ? "bg-primary" : "bg-muted")} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}


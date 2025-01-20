"use client"

import BottomActionBar from "@/components/forms/onboarding/bottom-action-bar"
import { OnboardingStepper } from "@/components/forms/onboarding/stepper"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useOnboardingStore } from "@/lib/useOnboardingStore"
import { BarChart3, Link as LinkNew } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

const features = [
    {
        id: "short_links",
        icon: LinkNew,
        href: "/dashboard/urls/new",
        title: "Create a short link",
        description: "Turn a long and confusing URL into a short, memorable link.",
    },
    {
        id: "analytics",
        icon: BarChart3,
        href: "/dashboard/analytics",
        title: "Advanced analytics",
        description: "Get detailed insights about your links and audience.",
    },
] as const

export default function FeaturesForm({ token }: {
    token: string | null
}) {
    const router = useRouter()
    const { setToken, submitAllData, skippedSteps, featuresData } = useOnboardingStore()
    const [selectedFeature, setselectedFeature] = useState<any>(null)
    const [pending, setTransition] = useTransition();

    const handleSkip = async () => {
        handleSubmit()
    }

    const handleSubmit = async () => {
        setTransition(async () => {
            await submitAllData()
            if (selectedFeature) {
                window.location.href = selectedFeature?.href
            } else {
                window.location.href = "/dashboard"
            }
        });
    }

    const handleSelectFeature = (item: any) => {
        setselectedFeature(item)
    }

    useEffect(() => {
        if (token) {
            setToken(token)
        }
    }, [token, setToken]);

    return (
        <div className="container max-w-4xl py-10">
            <OnboardingStepper steps={["About you", "Your work", "Start creating"]} currentStep={2} skippedSteps={skippedSteps} />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Where would you like to start?</h1>
                    <p className="text-muted-foreground">Let's get down to work</p>
                </div>
                <form
                    onSubmit={
                        (e) => {
                            e.preventDefault()
                            handleSubmit()
                        }
                    }
                >
                    <div className="grid gap-4">
                        {features.map((item: any, index) => {
                            const isSelected = selectedFeature?.id === item.id
                            return <Card
                                key={index}
                                onClick={
                                    () => {
                                        handleSelectFeature(item)
                                    }
                                }
                                className={`cursor-pointer transition-colors ${isSelected ? "border-primary bg-primary/5" : ""
                                    }`}
                            >
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="rounded-full p-2 bg-primary/10">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">{item?.title}</CardTitle>
                                        <CardDescription>{item?.description}</CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                        })}
                    </div>
                    <BottomActionBar handleSkip={handleSkip}
                        backLink={'/onboarding/work'}
                        last={true}
                    />
                </form>
            </div>
        </div >
    )
}


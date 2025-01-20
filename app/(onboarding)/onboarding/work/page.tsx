"use client"

import BottomActionBar from "@/components/forms/onboarding/bottom-action-bar"
import { OnboardingStepper } from "@/components/forms/onboarding/stepper"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { industriesOptions, rolesOptions, teamSizeOptions, useOnboardingStore, workSchema } from "@/lib/useOnboardingStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"

export default function WorkPage() {
    const router = useRouter()
    const { selectedTeamSize, setSelectedTeamSize, setWorkData, setCurrentStep, setSkippedStep, workData, skippedSteps } = useOnboardingStore()

    const form = useForm<z.infer<typeof workSchema>>({
        resolver: zodResolver(workSchema),
        defaultValues: workData,
    })

    const onSubmit = (data: z.infer<typeof workSchema>) => {
        setWorkData(data)
        setCurrentStep(2)
        router.push("/onboarding/features")
    }

    const handleSkip = () => {
        setSkippedStep(1)
        setCurrentStep(2)
        router.push("/onboarding/features")
    }

    const handleSelectedTeamSize = (item: string) => {
        setSelectedTeamSize(item)
    }

    return (
        <div className="container max-w-4xl py-10">
            <OnboardingStepper steps={["About you", "Your work", "Start creating"]} currentStep={1} skippedSteps={skippedSteps} />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Tell us about your work</h1>
                    <p className="text-muted-foreground">This will help us understand your needs a bit better</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="industry"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>What does your company do?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an industry" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="max-h-[300px]">
                                            {
                                                industriesOptions?.map((item, index) => {
                                                    return <SelectItem value={item} key={index}>{item}</SelectItem>
                                                })
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid gap-2">
                            <FormLabel>How many people work at your company?</FormLabel>
                            <div className="flex flex-wrap gap-2">
                                {
                                    teamSizeOptions?.map((item, index) => {
                                        const isSelected = item === selectedTeamSize
                                        return <Button variant={
                                            isSelected ? 'default' : 'outline'
                                        }
                                            onClick={() => {
                                                handleSelectedTeamSize(item)
                                            }}
                                            type="button"
                                            className="rounded-full "
                                            value={item} key={index} > {item}</Button>
                                    })
                                }
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="company_role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select your role</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="max-h-[300px]">
                                            {
                                                rolesOptions?.map((item, index) => {
                                                    return <SelectItem value={item} key={index}>{item}</SelectItem>
                                                })
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <BottomActionBar handleSkip={handleSkip}
                            backLink={"/onboarding/about"}
                        />
                    </form>
                </Form>
            </div>
        </div >
    )
}


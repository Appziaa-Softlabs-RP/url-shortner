"use client"

import BottomActionBar from "@/components/forms/onboarding/bottom-action-bar"
import { OnboardingStepper } from "@/components/forms/onboarding/stepper"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { aboutSchema, rwpsUseCase, useOnboardingStore } from "@/lib/useOnboardingStore"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import type { z } from "zod"

export default function AboutPage() {
    const router = useRouter()
    const { selectedIntendedUse, setSelectedIntendedUse, setAboutData, setCurrentStep, setSkippedStep, aboutData } = useOnboardingStore()

    const form = useForm<z.infer<typeof aboutSchema>>({
        resolver: zodResolver(aboutSchema),
        defaultValues: aboutData,
    })

    const onSubmit = (data: z.infer<typeof aboutSchema>) => {
        setAboutData(data)
        setCurrentStep(1)
        router.push("/onboarding/work")
    }

    const handleSkip = () => {
        setSkippedStep(0)
        setCurrentStep(1)
        router.push("/onboarding/work")
    }

    const handleSelectedUseCase = (item: string) => {
        if (selectedIntendedUse.includes(item)) {
            setSelectedIntendedUse(selectedIntendedUse.filter((i) => i !== item))
        } else {
            setSelectedIntendedUse([...selectedIntendedUse, item])
        }
    }

    return (
        <div className="container grid gap-6 max-w-4xl py-10">
            <OnboardingStepper steps={["About you", "Your work", "Start creating"]} currentStep={0} skippedSteps={[]} />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Welcome to RWPS</h1>
                    <p className="text-muted-foreground">Tell us a bit about yourself</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>What should we call you?</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            <FormLabel>How will you use RWPS?</FormLabel>
                            <FormDescription>Your selection will be used to personalize your experience. Choose all that apply.</FormDescription>
                            <div className="flex gap-2 whitespace- flex-wrap pt-4">
                                {rwpsUseCase.map((item, index) => {
                                    const isSelected = selectedIntendedUse.includes(item.label)
                                    return <Button key={index}
                                        type="button"
                                        variant={
                                            isSelected ? 'default' : 'outline'
                                        }
                                        onClick={() => {
                                            handleSelectedUseCase(item.label)
                                        }}
                                        className="flex rounded-full items-center gap-2">
                                        <Image
                                            src={item?.icon}
                                            alt="icon"
                                            width={30}
                                            height={30}
                                        />
                                        <label htmlFor={item.label} className="text-sm">{item.label}</label>
                                    </Button>
                                })}
                            </div>
                        </div>

                        <BottomActionBar handleSkip={handleSkip} />
                    </form>
                </Form>
            </div>
        </div >
    )
}


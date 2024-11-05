'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from "@/components/ui/input-otp"
import { useRegisterStore } from '@/lib/register-store'
import { cn } from '@/lib/utils'
import { zodResolver } from "@hookform/resolvers/zod"
import { redirect } from 'next/navigation'
import { useForm } from "react-hook-form"
import { z } from "zod"

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    })
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function RegisterDetailsOtpVerify({ className, role, ...props }: UserAuthFormProps) {

    const {
        loading,
        email,
        otp,
        status,
        setOtp,
        setStatus,
        verifyOtp,
        changeCurrentStep
    } = useRegisterStore()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: otp,
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setOtp(data.pin)
        verifyOtp()
    }

    React.useEffect(() => {
        if (status === 200) {
            setStatus(0)
            changeCurrentStep(0)
            setOtp('')
            redirect('/login');
        }
    }, [status, changeCurrentStep, setStatus, setOtp, role])

    return (
        <div className={cn('grid gap-2 p-2', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <FormField
                        control={form.control}
                        disabled={loading}
                        name="pin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>One-Time Password</FormLabel>
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription>
                                    Please enter the one-time password sent to <span className='font-bold'>{email}</span>.{" "}<span
                                        className='text-primary transition-all duration-150 hover:text-primary/70 cursor-pointer'
                                        onClick={() => changeCurrentStep(0)}
                                    >Change</span>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={loading} type="submit" className='w-full'>
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    )
}
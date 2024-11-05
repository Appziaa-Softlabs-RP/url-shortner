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
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useLoginWithPhoneStore } from '@/lib/login-with-phone-store'
import { cn } from '@/lib/utils'
import { zodResolver } from "@hookform/resolvers/zod"
import Link from 'next/link'
import { useForm } from "react-hook-form"
import { z } from "zod"

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    })
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function LoginPhoneOtpVerify({ className, ...props }: UserAuthFormProps) {

    const {
        loading,
        phone,
        otp,
        setOtp,
        verifyOtp,
        changeCurrentStep
    } = useLoginWithPhoneStore()

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

    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Enter OTP
                </h1>
            </div>
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
                                        Please enter the one-time password sent to <span className='font-bold'>{phone}</span>.{" "}<span
                                            className='text-primary transition-all duration-150 hover:text-primary/70 cursor-pointer'
                                            onClick={() => changeCurrentStep(0)}
                                        >Change</span>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button disabled={loading} type="submit" className='w-full'>Submit</Button>
                    </form>
                </Form>
            </div>
            <p className="text-xs space-x-1 flex items-center justify-center">
                <span>Login with</span>
                <Link href="/login" className="text-blue-500 hover:underline">
                    email
                </Link>
            </p>
        </>
    )
}
'use client'

import * as React from 'react'

import { useLoginWithPhoneStore } from '@/lib/login-with-phone-store'
import { cn } from '@/lib/utils'
import { LoginPhoneOtpReq } from './forms/phone'
import { LoginPhoneOtpVerify } from './forms/otp'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function LoginWithPhoneStepper({ className, ...props }: UserAuthFormProps) {

    const {
        currentStep
    } = useLoginWithPhoneStore()

    return (
        <div className={cn('grid gap-6 p-2', className)} {...props}>

            {
                currentStep === 0 &&
                <LoginPhoneOtpReq />
            }

            {
                currentStep === 1 &&
                <LoginPhoneOtpVerify />
            }
        </div>
    )
}
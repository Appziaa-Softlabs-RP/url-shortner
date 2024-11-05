'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { useLoginWithPhoneStore } from '@/lib/login-with-phone-store'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function LoginPhoneOtpReq({ className, ...props }: UserAuthFormProps) {
    const [userPhone, setUserPhone] = React.useState('');

    const {
        loading,
        setPhone,
        sendOtp,
    } = useLoginWithPhoneStore()

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()

        if (userPhone == '') {
            return toast({
                variant: 'destructive',
                title: "Failed!",
                description: "Please add phone number"
            });
        }

        setPhone(userPhone)
        sendOtp();
    }

    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Login With Phone
                </h1>
            </div>
            <div className={cn('grid gap-6 p-2', className)} {...props}>

                <form onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label htmlFor="phone">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                placeholder="XXXXXXXXXX"
                                type="tel"
                                value={userPhone}
                                onChange={(event) => setUserPhone(event.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <Button disabled={loading} type="submit" className='w-full'>
                            Send OTP
                        </Button>
                    </div>
                </form>
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
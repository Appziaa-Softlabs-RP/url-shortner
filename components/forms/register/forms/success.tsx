
'use client'


import { Button } from '@/components/ui/button'
// import { useForgotPasswordStore } from '@/lib/forgot-password-store'
import { cn } from '@/lib/utils'
import { CheckCircle, X } from 'lucide-react'
import Link from 'next/link'

export function ForgotPasswordStatus({ className, ...props }: any) {

    // const {
    //     status
    // } = useForgotPasswordStore()
    const status = 200;

    return (
        <div className={cn('grid gap-6 p-2', className)} {...props}>

            {
                status == 200 ?
                    <div className='flex flex-col space-y-2 text-xl items-center'>
                        <CheckCircle className='text-green-500' size={30} />
                        <div className='pb-4'>
                            <p className="text-center text-lg font-bold">Success</p>
                            <p className="text-center text-sm">Password Successfully Changed</p>
                        </div>
                        <Link href='/login'>
                            <Button>Login</Button>
                        </Link>
                    </div>
                    :
                    <div className='flex flex-col space-y-2 text-xl items-center'>
                        <X className='text-red-500' size={30} />
                        <div className='pb-4'>
                            <p className="text-center text-lg font-bold">Failed</p>
                            <p className="text-center text-sm">Failed To Change Password</p>
                        </div>
                        <Button onClick={
                            () => window.location.reload()
                        }>
                            Try Again
                        </Button>
                    </div>
            }
        </div>
    )
}

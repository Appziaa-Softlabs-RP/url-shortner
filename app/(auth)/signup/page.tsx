import { Metadata } from 'next'
import Link from 'next/link'

import { RegisterDetailsFormStepper } from '@/components/forms/register/register-form-stepper'

export const metadata: Metadata = {
  title: `Login With ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Login With ${process.env.NEXT_PUBLIC_APP_NAME}`
}

export default async function AuthenticationPage() {


  return (
    <>
      <RegisterDetailsFormStepper />
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking register, you agree to our{' '}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
      <p className="px-8 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Login
        </Link>
        .
      </p>

    </>
  )
}
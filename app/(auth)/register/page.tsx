import { RegisterDetailsFormStepper } from "@/components/forms/register/register-form-stepper";
import Link from "next/link";

export default async function Page() {
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
  );
}

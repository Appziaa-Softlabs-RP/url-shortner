import LoginUser from "@/components/forms/auth-forms/login";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <LoginUser />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="underline underline-offset-4 hover:text-primary"
        >
          Register
        </Link>
        .
      </p>
    </>
  );
}

import LoginUser from "@/components/forms/auth-forms/login";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <LoginUser />
      <p className="text-xs space-x-1 flex items-center justify-center">
        <span>Already have an account?</span>
        <Link href="/signup" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
    </>
  );
}

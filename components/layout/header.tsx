import { authOptions } from "@/lib/auth-options";
import NavLinks from "./navlinks";
import { getServerSession } from "next-auth";

export default async function Header() {

  const session = await getServerSession({
    ...authOptions,
    pages: {
      signIn: "/signin",
    },
  });

  return (
    <NavLinks session={session} />
  )
}
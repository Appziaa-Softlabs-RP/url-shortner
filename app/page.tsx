import { redirect } from "next/navigation"

export default function Home() {

  redirect('/v1/docs/getting-started/introduction')

  return null
}

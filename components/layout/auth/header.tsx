import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return <>
        <nav className="w-full max-w-[100dvw] md:h-[60px] flex items-center">
            <div className="max-w-screen-xl w-full flex md:flex-wrap items-center justify-between mx-auto p-4 md:px-10 md:py-4">
                <Link className="flex items-center" href="/">
                    <Image src="/img/logo.svg" alt="Logo" height={40} width={150} />
                </Link>
            </div>
        </nav>
    </>
}
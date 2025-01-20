import DeleteUrl from "@/components/forms/dashboard/links/delete-url";
import CopyText from "@/components/shared/copy-text";
import Share from "@/components/shared/share";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { UrlItem } from "@/types/links";
import { format } from "date-fns";
import { CalendarRange, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ShowUrlCard({ data, token }: {
    data: UrlItem,
    token: string
}) {
    return <Card className="border-0 shadow-none max-w-full overflow-hidden">
        <CardHeader>
            <div className="flex flex-wrap gap-2 justify-between items-center">
                <Link
                    href={`/dashboard/urls/view/${data?.short_code}`}
                >
                    <h2 className="sm:text-xl md:text-3xl font-bold border-b-2 border-transparent duration-200 ease-in-out transition-all hover:border-black">
                        {data?.title}
                    </h2>
                </Link>
                <div className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_50px_50px] w-fit gap-2">
                    <CopyText
                        text={data?.short_url}
                    />
                    <Share
                        url={data?.short_url}
                    />
                    <Link href={`/dashboard/urls/edit/${data?.short_code}`}>
                        <Button variant={'outline'} className="rounded-md" size={'sm'}>
                            <Pencil size={16} />
                        </Button>
                    </Link>
                    <DeleteUrl
                        shortCode={data?.short_code}
                        token={token}
                    />
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex-col-sm-flex-row gap-4 items-center border-b-2 py-4">
                <div className="h-8 sm:h-12 w-8 sm:w-12 rounded-full border-2">
                    <Image
                        src={`https://www.google.com/s2/favicons?sz=64&domain=${data?.long_url}`}
                        alt="fv"
                        width={64}
                        height={64}
                        className="rounded-full"
                        unoptimized
                    />
                </div>
                <div className="text-sm grid gap-2">
                    <Link href={"https://" + data?.short_url} target="_blank">
                        <p className="font-bold text-blue-600 hover:underline">
                            {data?.short_url}
                        </p>
                    </Link>
                    <Link href={data?.long_url} target="_blank">
                        <p className="text-gray-600 hover:underline">
                            {data?.long_url}
                        </p>
                    </Link>
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                    <span className="text-xs text-gray-600 flex gap-2 items-center">
                        <CalendarRange size={15} />
                        <span>
                            {format(new Date(data?.created_at), "MMMM d, yyyy 'at' hh:mm a 'GMT'XXX")}
                        </span>
                    </span>
                </div>
            </div>
        </CardFooter>
    </Card>
}
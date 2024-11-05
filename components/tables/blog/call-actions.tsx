"use client";
import LoadingCircle from "@/components/loading/circle";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { blogCategory } from "@/constants/data";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
    data: blogCategory;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const { data: session } = useSession();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const onConfirm = async ({ data }: any) => {
        if (loading) return;

        //@ts-ignore
        if (!session?.accessToken) return toast({
            title: 'Error',
            variant: 'destructive',
            description: 'Unauthorized',
        });

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/admin/blogs/${data.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    //@ts-ignore
                    'Authorization': `Bearer ${session?.accessToken}`,
                },
                cache: 'no-cache'
            });

            const json = await res.json();
            toast({
                title: res?.status == 200 ? 'Success' : 'Error',
                variant: res?.status == 200 ? null : 'destructive',
                description: json?.message ?? '',
            });
            router.refresh();
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
            setOpen(false)
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={() => onConfirm({
                    data: data
                })}
                loading={loading}
            />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <a href={`/admin/dashboard/blogs/edit/${data.id}`}
                            className="flex flex-row items-center">
                            <Edit className="mr-2 h-4 w-4" /> Update
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        {
                            !(session as any)?.accessToken ?
                                <div className="w-full flex justify-center"><LoadingCircle /></div>
                                :
                                <button onClick={() => setOpen(true)} className="flex flex-row items-center">
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                </button>
                        }
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
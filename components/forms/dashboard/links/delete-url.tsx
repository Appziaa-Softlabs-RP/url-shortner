"use client"

import { useState } from "react";
import { deleteUrl } from "@/api";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Trash2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function DeleteUrl({ shortCode, token }: {
    shortCode: string,
    token: string
}) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleDeleteUrl = async () => {
        startTransition(async () => {
            try {
                const response = await deleteUrl({
                    shortCode: shortCode,
                    token: token
                });
                if (response.status === 200) {
                    router.refresh();
                    window.location.href = '/dashboard/urls'
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: response.data.message
                    });
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: response.data.message
                    });
                }
            } catch (e: any) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: e.message
                });
            } finally {
                setIsOpen(false);
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-md" size="sm">
                    <Trash2 size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete this URL?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the shortened URL.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDeleteUrl}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


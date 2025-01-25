"use client"

import { deleteOauthApp } from "@/api/oauthAppApi"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface DeleteAppButtonProps {
    appId: string
    appName: string
    token: string
}

export function DeleteAppButton({ appId, appName, token }: DeleteAppButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            // Replace this with your actual API call
            const response = await await deleteOauthApp({
                id: appId,
                token: token,
            });

            if (response.status !== 200) {
                throw new Error("Failed to delete the app")
            }

            toast({
                title: "App Deleted",
                description: `${appName} has been successfully deleted.`,
            })
            router.refresh()
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete the app. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsDeleting(false)
            setIsOpen(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Trash2 size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete this app?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the OAuth app &quot;{appName}&quot;.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


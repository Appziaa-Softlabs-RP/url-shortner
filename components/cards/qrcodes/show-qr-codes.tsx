"use client"

import { deleteQrCode } from "@/api/qrCodeApi"
import Share from "@/components/shared/share"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Copy, Download, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface QrCodeData {
    id: number
    long_url: string
    qr_code: string
    created_at: string
}

export default function ShowQrCodeCard({ data, token }: { data: QrCodeData; token: string }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteQrCode({ shortCode: data.id.toString(), token })
            toast({
                title: "QR Code Deleted",
                description: "The QR code has been successfully deleted.",
            })
            router.push("/dashboard/qr-codes")
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete the QR code. Please try again.",
            })
        } finally {
            setIsDeleting(false)
            setIsDialogOpen(false)
        }
    }

    const copyToClipboard = (text: string, message: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast({
                title: "Copied!",
                description: message,
            })
        })
    }

    const downloadQRCode = () => {
        const link = document.createElement("a")
        link.href = data.qr_code
        link.download = `qrcode-${data.id}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>QR Code Details</CardTitle>
                <CardDescription>View and manage your QR code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-64 h-64 relative">
                        <Image
                            src={data.qr_code || "/placeholder.svg"}
                            alt="QR Code"
                            layout="fill"
                            objectFit="contain"
                            unoptimized
                        />
                    </div>
                    <div className="flex-1 space-y-4">
                        <div>
                            <Label htmlFor="long-url">Long URL</Label>
                            <div className="flex">
                                <Input id="long-url" value={data.long_url} readOnly className="flex-grow" />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => copyToClipboard(data.long_url, "Long URL copied to clipboard!")}
                                    className="ml-2"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="created-at">Created At</Label>
                            <Input id="created-at" value={new Date(data.created_at).toLocaleString()} readOnly />
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between flex-wrap gap-2">
                <div className="flex gap-2 items-center">
                    <Button variant="outline" onClick={downloadQRCode}>
                        <Download size={'sm'} className="w-4 h-4 mr-2" />
                        Download QR
                    </Button>
                    <Share
                        url={data.qr_code}
                    />
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to delete this QR code?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete the QR code and remove the data from our
                                servers.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                                {isDeleting ? "Deleting..." : "Delete"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}


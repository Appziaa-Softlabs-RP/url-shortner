"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCallback, useState } from "react"
import { createQrCode, updateQrCode } from "@/api/qrCodeApi"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

const qrCodeSchema = z.object({
    long_url: z.string().url({ message: "Please enter a valid URL" }),
})

type QrCodeFormValues = z.infer<typeof qrCodeSchema>

export default function QrCodeForm({
    data = null,
    token,
}: {
    data?: any
    token: string
}) {
    const form = useForm<QrCodeFormValues>({
        resolver: zodResolver(qrCodeSchema),
        defaultValues: {
            long_url: data?.long_url || "",
        },
    })

    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    const onSubmit = useCallback(
        async (values: QrCodeFormValues) => {
            try {
                setIsPending(true)
                const formData = new FormData()
                formData.append("long_url", values.long_url)

                const result = data
                    ? await updateQrCode({ short_code: data.id, data: formData, token })
                    : await createQrCode({ data: formData, token })

                const message = result.data.message
                const id = result.data.data.id

                if (result.status === 200) {
                    toast({
                        title: "Success",
                        description: message,
                    })
                    if (!data) {
                        form.reset()
                    }
                    window.location.href = (`/dashboard/qr-codes/${id}`)
                } else {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: message,
                    })
                }
            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: error?.message,
                })
            } finally {
                setIsPending(false)
            }
        },
        [data, form, router, token],
    )

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">{data ? "Edit QR Code" : "Create QR Code"}</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="long_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destination URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com" {...field} />
                                </FormControl>
                                <FormDescription>Enter the URL you want to create a QR code for.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Submitting..." : data ? "Update QR Code" : "Create QR Code"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}


"use client"

import { createUrl, fetchPageTitle, updateUrl } from "@/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import debounce from 'lodash/debounce'
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const urlSchema = z.object({
    long_url: z.string().url({ message: "Please enter a valid URL" }),
    title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(60).optional(),
})

type UrlFormValues = z.infer<typeof urlSchema>

export default function UrlShortenerForm({ data = null, token }: {
    data?: any,
    token: string
}) {
    const form = useForm<UrlFormValues>({
        resolver: zodResolver(urlSchema),
        defaultValues: {
            is_active: true,
            ...data
        },
    })
    const [isTitleFetched, setIsTitleFetched] = useState(false)
    const [urlError, setUrlError] = useState<string | null>(null)

    const router = useRouter()

    const onSubmit = useCallback(async (values: UrlFormValues) => {
        try {
            const formData = new FormData()
            formData.append('long_url', values.long_url)
            if (values.title) formData.append('title', values.title)

            const result = data
                ? await updateUrl({ id: data.id, data: formData, token })
                : await createUrl({ data: formData, token })

            const message = result.data.message

            if (result.status === 200) {
                toast({
                    variant: 'default',
                    title: 'Success',
                    description: message
                })
                if (!data) {
                    form.reset()
                } else {
                    router.push('/dashboard/urls')
                }
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: message
                })
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error?.message
            })
        }
    }, [data, form, router, token])

    const validateUrl = useCallback(async (url: string) => {
        if (url.length === 0) {
            setUrlError(null)
            return
        }
        try {
            const response = await fetch(`/api/validate-auth-user-url?url=${encodeURIComponent(url)}`)
            const data = await response.json()
            setUrlError(data?.message)
        } catch (error: any) {
            setUrlError(error.message)
        }
    }, [])

    const debouncedValidateUrl = useMemo(
        () => debounce(validateUrl, 300),
        [validateUrl]
    )

    const extractPageTitle = useCallback(async (url: string) => {
        if (isTitleFetched) return null
        try {
            const title = await fetchPageTitle({ url });
            if (title) {
                setIsTitleFetched(true)
                form.setValue('title', title)
            }
        } catch (error) {
            console.error('Error extracting title:', error)
        }
        return null
    }, [isTitleFetched])

    const debouncedExtractPageTitle = useMemo(
        () => debounce(extractPageTitle, 500),
        [extractPageTitle]
    )

    const getExtractedTitle = useCallback(async () => {
        if (isTitleFetched) return
        const url = form.getValues('long_url')
        if (url) {
            const title = await debouncedExtractPageTitle(url)
            if (title) {
                form.setValue('title', title)
            }
        }
    }, [form, isTitleFetched, debouncedExtractPageTitle])

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === 'long_url') {
                debouncedValidateUrl(value.long_url as string)
                if (urlError === null)
                    getExtractedTitle()
            }
        })
        return () => subscription.unsubscribe()
    }, [form, debouncedValidateUrl, getExtractedTitle])

    return (
        <div className="grid gap-6 max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-secondary">
                {
                    data ?
                        "Edit a short url" :
                        "Create a short url"
                }
            </h1>
            <Card className="w-full py-4 border-0 shadow-none">
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="long_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={
                                            urlError ? 'text-red-500' : ''
                                        }>Destination URL</FormLabel>
                                        <FormControl>
                                            <Input type="url"
                                                className={
                                                    urlError ? 'border-red-500' : ''
                                                }
                                                placeholder="https://example.com/my-long-url" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        {urlError && (
                                            <FormMessage className="font-light">{urlError}</FormMessage>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title <span className="font-light">(optional)</span></FormLabel>
                                        <div className="flex space-x-2">
                                            <FormControl>
                                                <Input placeholder="Enter meta title" {...field} />
                                            </FormControl>
                                        </div>
                                        <FormDescription>
                                            This will be used as the page title in search results
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end space-x-4">
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                                <Button type="submit"
                                    disabled={urlError !== null || !form.formState.isValid || data}
                                >Create your link</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}


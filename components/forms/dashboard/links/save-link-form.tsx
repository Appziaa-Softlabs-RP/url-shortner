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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import debounce from 'lodash/debounce'
import { Info } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react"
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
    const initialValuesRef = useRef<UrlFormValues>(form.getValues());
    const [isTitleFetched, setIsTitleFetched] = useState(false)
    const [pending, setTransition] = useTransition()
    const [urlError, setUrlError] = useState<string | null>(null)
    const [isAnythingChanged, setIsAnythingChanged] = useState(false)

    const router = useRouter()

    const onSubmit = useCallback(async (values: UrlFormValues) => {
        try {
            setTransition(async () => {
                const formData = new FormData()
                formData.append('long_url', values.long_url)
                if (values.title) formData.append('title', values.title)

                const result = data
                    ? await updateUrl({ short_code: data.short_code, data: formData, token })
                    : await createUrl({ data: formData, token })

                const message = result.data.message
                const shortCode = result.data.data.short_code;

                if (result.status === 200) {
                    toast({
                        variant: 'default',
                        title: 'Success',
                        description: message
                    })
                    if (!data) {
                        form.reset()
                    }
                    router.push(`/dashboard/urls/view/${shortCode}?new=true`)
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: message
                    })
                }
            })
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
            let link = `/api/validate-auth-user-url?url=${encodeURIComponent(url)}`;
            if (data) {
                link += `& short_code=${data.short_code} `
            }
            const response = await fetch(link)
            const json = await response.json()
            setUrlError(json?.message)
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
                debouncedValidateUrl(value.long_url as string);
                if (urlError === null && !data) {
                    getExtractedTitle();
                }
            }

            // Compare current values with initial values
            const hasChanged = Object.keys(initialValuesRef.current).some(
                (key) => value[key as keyof UrlFormValues] !== initialValuesRef.current[key as keyof UrlFormValues]
            );
            setIsAnythingChanged(hasChanged);
        });

        return () => subscription.unsubscribe();
    }, [form, debouncedValidateUrl, getExtractedTitle, urlError, data]);


    return (
        <div className="grid gap-6 max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-secondary">
                {
                    data ?
                        <span className="flex items-center gap-4">
                            <span>Edit a destination link</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="text-slate-600" size={20} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="font-normal">The destination URL can be updated while the short URL remains unchanged.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                        </span> :
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
                                        }>Destination Link</FormLabel>
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

                            {
                                data?.short_url &&
                                <div className="grid gap-2">
                                    <FormLabel>Short URL</FormLabel>
                                    <Input type="url" value={data?.short_url} disabled />
                                </div>
                            }
                            <div className="flex justify-end space-x-4">
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                                <Button type="submit"
                                    disabled={urlError !== null || !form.formState.isValid || (data && !isAnythingChanged) || pending}
                                >
                                    {
                                        data ?
                                            <span>
                                                {
                                                    pending ?
                                                        "Updating..." :
                                                        "Update"
                                                }
                                            </span>
                                            : <span>
                                                {
                                                    pending ?
                                                        "Creating..." :
                                                        "Create"
                                                }
                                            </span>
                                    }
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}


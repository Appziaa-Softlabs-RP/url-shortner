"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateDisplayName } from "@/api/profileApi"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState, useTransition } from "react"

const profileFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(30, {
            message: "Name must not be longer than 30 characters.",
        })
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

type DisplayNameProps = {
    token: string,
    name: string | null
}

export function DisplayNameForm({ token, name }: DisplayNameProps) {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: name ?? undefined,
        },
        mode: "onChange",
    })

    const [defaultDisplayName, setDefaultDisplayName] = useState(name)
    const [pending, setTransition] = useTransition();
    const [isChanged, setIsChanged] = useState(false)

    async function onSubmit(data: ProfileFormValues) {
        try {
            setTransition(async () => {
                const formData = new FormData()
                formData.append('name', data.name)
                const response = await updateDisplayName({
                    token: token,
                    formData: formData
                });

                if (response.status == 200) {
                    toast({
                        variant: 'default',
                        title: "Success",
                        description: response?.data?.message
                    });
                    setDefaultDisplayName(response.data.data.name)
                    setIsChanged(false)
                    return;
                }

                toast({
                    variant: 'default',
                    title: "Success",
                    description: response?.data?.message ?? "Something went wrong"
                });
            })

        } catch (e: any) {
            toast({
                variant: 'default',
                title: "Success",
                description: e?.message ?? "Something went wrong"
            });
        }
    }

    const watchedName = form.watch('name');

    useEffect(() => {
        if (watchedName !== defaultDisplayName && defaultDisplayName !== '' && defaultDisplayName !== undefined && defaultDisplayName !== null) {
            setIsChanged(true)
        } else {
            setIsChanged(false)
        }
    }, [watchedName, defaultDisplayName])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Display Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit"
                    disabled={
                        pending || !isChanged
                    }
                >
                    {
                        pending ? "Updating..." : "Update display name"
                    }
                </Button>
            </form>
        </Form>
    )
}
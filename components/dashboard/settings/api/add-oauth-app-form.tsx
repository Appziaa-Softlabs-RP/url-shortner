"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { createOauthApp } from "@/api/oauthAppApi";

const registerOauthAppFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters." })
        .max(30, { message: "Name must not be longer than 30 characters." }),
    appUrl: z
        .string()
        .url({ message: "Must be a valid URL." })
        .transform((url) => new URL(url).origin),
    description: z
        .string()
        .min(2, { message: "Description must be at least 2 characters." })
        .max(200, { message: "Description must not be longer than 200 characters." }),
});

type ProfileFormValues = z.infer<typeof registerOauthAppFormSchema>;

type DisplayNameProps = {
    token: string;
    data?: string | null;
};

export function AddOauthForm({ token, data }: DisplayNameProps) {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(registerOauthAppFormSchema),
        defaultValues: {
            name: data ?? undefined,
        },
        mode: "onChange",
    });

    const [pending, setTransition] = useTransition();

    async function onSubmit(data: ProfileFormValues) {
        setTransition(async () => {
            try {
                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("description", data.description);
                formData.append("app_url", data.appUrl);

                const response = await createOauthApp({
                    token: token,
                    data: formData
                });

                if (response.status === 200) {
                    toast({
                        title: "Success",
                        description: response?.data?.message ?? "Oauth App registered successfully.",
                        variant: "default",
                    });
                    window.location.href = "/dashboard/settings/api"
                    return;
                }

                toast({
                    title: "Error",
                    description: response?.data?.message ?? "Something went wrong.",
                    variant: "destructive",
                });
            } catch (e: any) {
                toast({
                    title: "Error!",
                    description: e?.message ?? "Something went wrong.",
                    variant: "destructive",
                });
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Application Name (required)</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormDescription>
                                Please provide a unique and descriptive name for your application. This value will be displayed to users when they authenticate to RWPS.
                                <br />
                                - This will be used as the Meta Title.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="appUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Application Link (required)</FormLabel>
                            <FormControl>
                                <Input type="url" placeholder="https://example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                The URL of your application. This value will be displayed to users when they authenticate to RWPS. Here are some guidelines for the application link:
                                <br />
                                - Must be a valid URL.
                                <br />
                                - It must only be a root domain (e.g., a link that does not end in `.html` or `.php`) and must end with a forward slash (e.g., https://your-app.com).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Application Description (required)</FormLabel>
                            <FormControl>
                                <Input placeholder="Description for application" {...field} />
                            </FormControl>
                            <FormDescription>
                                Provide a brief description of your application. This will be used as the Meta Description and should be informative for users considering authenticating with your application.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={pending || !form.formState.isValid}>
                    {pending ? "Adding..." : "Add Oauth App"}
                </Button>
            </form>
        </Form>
    );
}
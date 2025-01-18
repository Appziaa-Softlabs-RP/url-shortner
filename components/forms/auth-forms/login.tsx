"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function LoginUser() {
    const { isLoading, loginUser, email } = useAuthStore();

    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: email,
        }
    });

    const onSubmit = async (data: UserFormValue) => {
        loginUser({
            email: data.email,
            password: data.password
        })
    };

    return <>
        <div className="flex flex-col space-y-2 text-start">
            <h1 className="text-2xl font-bold tracking-tight">
                Sigin
            </h1>
        </div>

        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <div className="w-full flex flex-col items-start justify-center space-y-3">
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Email"
                                        type="email"
                                        className="w-full"
                                        style={{
                                            height: "44px"
                                        }}
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <div className="w-full flex flex-col items-start justify-center space-y-3">
                                <FormLabel>
                                    Enter Password
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Password"
                                        type="password"
                                        className="w-full"
                                        style={{
                                            height: "44px"
                                        }}
                                        {...field} />
                                </FormControl>

                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />

                <Button
                    disabled={isLoading}
                    className="font-semibold my-2 w-full p-5 text-base"
                    type="submit">
                    Proceed
                </Button>
            </form>
        </Form>
    </>
}
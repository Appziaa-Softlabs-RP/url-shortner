"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterStore } from "@/lib/register-store";
import { RegisterFormValues, registerSchema } from "@/lib/schemas/register";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserRegisterDetails({
    className,
    ...props
}: UserAuthFormProps) {
    const {
        loading,
        setPersonalDetails,
        sendOtp,
        email,
        password,
    } = useRegisterStore();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            email: email,
            password: password,
        },
    });

    const processForm: SubmitHandler<RegisterFormValues> = (data: any) => {
        setPersonalDetails({
            email: data.email,
            password: data.password,
        });
        sendOtp();
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl text-start font-semibold tracking-tight">
                    Create your account with{" "}
                    <span className="text-secondary">
                        {process.env.NEXT_PUBLIC_APP_NAME}
                    </span>
                </h1>
            </div>

            <div className={cn("grid gap-6 p-2", className)} {...props}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(processForm)}
                        className="space-y-8 w-full"
                    >

                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type={"password"}
                                                placeholder="Password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full">
                            Register
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { authOptions } from "@/lib/auth-options";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import { getOnboardingStatus } from '../../api/userApi';
export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_APP_NAME
};

const getOnboardingStatusResult = async ({ token }: any) => {
    try {
        return await getOnboardingStatus({
            token: token
        });
    } catch (e) {
        return null
    }
}
export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/login",
        },
    });

    const handleLogout = async () => {
        await signOut();
    }

    if (!session) {
        handleLogout()
        redirect('/login');
    }

    const getOnboardingStatus = await getOnboardingStatusResult({
        token: session?.accessToken
    })


    if (getOnboardingStatus?.is_onboarding_done == false) {
        redirect('/onboarding/about');
    }

    return (
        <>
            <div>
                <SidebarProvider>
                    <AppSidebar
                        user={session?.user}
                    />
                    <main className="container relative overflow-x-auto max-w-full p-4 bg-gray-50">
                        <SidebarTrigger />
                        {children}
                    </main>
                </SidebarProvider>
            </div>
        </>
    );
}
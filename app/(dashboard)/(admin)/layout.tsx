import AuthHeader from "@/components/layout/auth-header";
import Sidebar from "@/components/layout/sidebar";
import { adminNavItems } from "@/constants/data";
import { authOptions } from "@/lib/auth-options";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_APP_NAME
};

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

    if (!session || session.user?.role !== 'admin') {
        handleLogout()
        redirect('/login');
    }

    return (
        <>
            <AuthHeader />
            <div className="relative grid lg:grid-cols-[auto_3fr] max-w-[1400px]">
                <Sidebar
                    navItems={adminNavItems}
                />
                <main className="relative py-16 overflow-x-auto max-w-full p-4">{children}</main>
            </div>
        </>
    );
}
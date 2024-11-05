import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { create } from "zustand";

interface UserState {
    isLoading?: boolean;
    email: string;
    password: string;

    login: () => void;
    loginUser: (userDetails: any) => void;
}

export const useAuthStore = create<UserState>(
    (set, get) => ({
        email: "",
        password: "",

        login: async () => {
            try {
                set({ isLoading: true });
                const res = await signIn('credentials', {
                    email: get().email,
                    password: get().password,
                    redirect: false
                });

                if (res?.error) {
                    toast({
                        title: 'Error',
                        variant: 'destructive',
                        description: res?.error,
                    });
                    return;
                } else {
                    window.location.href = "/"
                }
            } catch (e: any) {
                toast({
                    title: 'Error',
                    variant: 'destructive',
                    description: e.message,
                });
            } finally {
                set({ isLoading: false });
            }

        },
        loginUser: (userDetails) => {
            set({
                email: userDetails.email,
                password: userDetails.password
            });
            get().login()
        }
    })
);
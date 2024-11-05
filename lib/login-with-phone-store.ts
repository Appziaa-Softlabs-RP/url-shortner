import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type State = {
    currentStep: number;
    loading: boolean;
    status: number;
    error: string | null;
    setLoading: (loading: boolean) => void;
}

export type UserInfo = {
    phone: string;
    otp: string;
    otpId: string;
}


export type Actions = {
    changeCurrentStep: (currentStep: number) => void;
    sendOtp: () => void;
    verifyOtp: () => void;
    setPhone: (phone: string) => void;
    setOtp: (otp: string) => void;
};

export const useLoginWithPhoneStore = create<State & UserInfo & Actions>()(
    persist(
        (set, get) => ({
            loading: false,
            currentStep: 0,
            status: 0,
            error: null,

            phone: '',
            otp: '',
            otpId: '',

            setPhone: (phone) => set({ phone }),

            setOtp: (otp) => set({ otp }),

            setLoading: (loading) => set({ loading }),

            changeCurrentStep: (currentStep) => set({ currentStep }),

            sendOtp: async () => {
                try {
                    set({ loading: true });

                    const formData = new FormData();
                    formData.append('phone', get().phone);

                    if (!get().phone) {
                        return toast({
                            title: 'Error',
                            variant: 'destructive',
                            description: 'Please add phone',
                        })
                    }

                    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/login-company-phone-send-otp-request`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                        },
                        body: formData,
                        cache: 'no-cache'
                    });

                    if (res.status == 200) {
                        set({ currentStep: 1 });
                    }

                    const json = await res.json();

                    set({
                        status: res?.status,
                        otpId: json?.data?.otpId,
                    });

                    toast({
                        title: res?.status == 200 ? 'Success' : 'Error',
                        variant: res?.status == 200 ? 'default' : 'destructive',
                        description: json?.message ?? '',
                    });


                } catch (error: any) {
                    set({ error: error.message });
                } finally {
                    set({ loading: false });

                }
            },

            verifyOtp: async () => {
                try {
                    set({ loading: true });

                    if (!get().otp) {
                        return toast({
                            title: 'Error',
                            variant: 'destructive',
                            description: 'Please add OTP',
                        })
                    }

                    const res = await signIn('credentials', {
                        email: '',
                        password: '',
                        phone: get().phone,
                        otp: get().otp,
                        otpId: get().otpId,
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
                } catch (error: any) {
                    set({ error: error.message });
                } finally {
                    set({ loading: false });
                }
            }
        }),


        { name: "rewards-login-phone-store", skipHydration: true },
    ),
);
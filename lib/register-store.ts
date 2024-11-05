import { toast } from "@/components/ui/use-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type State = {
    currentStep: number;
    loading: boolean;
    status: number;
    error: string | null;
    otp: string;
    otpId: string;
    setLoading: (loading: boolean) => void;
}

export type UserInfo = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}

export type Actions = {
    changeCurrentStep: (currentStep: number) => void;
    sendOtp: () => void;
    verifyOtp: () => void;
    setStatus: (status: number) => void;
    setPersonalDetails: (data: UserInfo) => void;
    setOtpId: (otpId: string) => void;
    setOtp: (otp: string) => void;
};

export const useRegisterStore = create<State & UserInfo & Actions>()(
    persist(
        (set, get) => ({
            loading: false,
            currentStep: 0,
            status: 0,
            error: null,


            // Personal Details
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',

            otp: '',
            otpId: '',

            setStatus: (status) => set({ status }),

            setPersonalDetails: (data: UserInfo) => set(data),

            setOtpId: (otpId) => set({ otpId }),

            setOtp: (otp) => set({ otp }),

            setLoading: (loading) => set({ loading }),

            changeCurrentStep: (currentStep) => set({ currentStep }),

            sendOtp: async () => {
                try {
                    set({ loading: true });

                    const formData = new FormData();
                    formData.append('first_name', get().firstName);
                    formData.append('last_name', get().lastName);
                    formData.append('phone', get().phone);
                    formData.append('email', get().email);
                    formData.append('password', get().password);
                    formData.append('type', 'phone');

                    if (!get().email) {
                        return toast({
                            title: 'Error',
                            variant: 'destructive',
                            description: 'Please add Email',
                        })
                    }

                    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/register-request`, {
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
                        otpId: json?.data?.otp_id,
                    });

                    toast({
                        title: res?.status == 200 ? 'Succeess' : 'Error',
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

                    const formData = new FormData();
                    formData.append('otp', get().otp);
                    formData.append('otp_id', get().otpId);
                    formData.append('type', "phone");

                    if (!get().otp || !get().password) {
                        return toast({
                            title: 'Error',
                            variant: 'destructive',
                            description: 'Please add OTP and Password',
                        })
                    }

                    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/register-verify`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                        },
                        body: formData,
                        cache: 'no-cache'
                    });

                    const json = await res.json();

                    set({ status: res?.status });

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
            }
        }),


        { name: "ai-register-store", skipHydration: true },
    ),
);
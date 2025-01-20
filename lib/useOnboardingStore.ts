import { create } from "zustand"
import { z } from "zod"
import { saveUserOnboarding } from "@/api/userApi"

export const rwpsUseCase = [
    { label: "Branded short URLs", icon: '/icons/url.svg' },
    { label: "Customizable QR Codes", icon: '/icons/qr.svg' },
    { label: "API for developers", icon: '/icons/api.svg' },
    { label: "Digital marketing or branding", icon: '/icons/marketing.svg' },
    { label: "Advanced analytics & tracking", icon: '/icons/analytics.svg' },
    { label: "Personalized SMS communications", icon: '/icons/chat.svg' },
    { label: "Other", icon: "/icons/other.svg" }
]

export const industriesOptions = [
    "Automobiles & Components",
    "Banks & Financial Services",
    "Commercial & Professional Services",
    "Construction Materials",
    "Consumer Goods - Discretionary",
    "Consumer Goods - Staples",
    "Education",
    "Energy",
    "Hospitality",
    "Health Care Equipment & Services",
    "Industrials & Capital Goods",
    "Insurance",
    "Materials",
    "Media",
    "Non-profit",
    "Pharmaceuticals, Biotechnology & Life Sciences",
    "Real Estate",
    "Retail",
    "Software & Services",
    "Technology Hardware & Semiconductors",
    "Telecommunication services",
    "Transportation",
    "Utilities",
    "Other",
]

export const teamSizeOptions = [
    "1 - 9",
    "10 - 49",
    "50 - 249",
    "250 - 4999",
    "5000 - 9999",
    "10,000+"
]

export const rolesOptions = [
    "C-suite",
    "VP",
    "Director",
    "Manager",
    "Individual contributor",
    "Solopreneur / owner",
    "Other"
]
export const aboutSchema = z.object({
    name: z.string().min(1, "Name is required"),
})

export const workSchema = z.object({
    company_role: z.string(),
    industry: z.string(),
})

export const featuresSchema = z
    .array(z.enum(["short_links", "qr_codes", "landing_pages", "custom_domain", "analytics"]))
    .default([])

type AboutData = z.infer<typeof aboutSchema>
type WorkData = z.infer<typeof workSchema>
type FeaturesData = z.infer<typeof featuresSchema>

interface OnboardingStore {
    currentStep: number
    skippedSteps: number[]
    aboutData: Partial<AboutData>
    workData: Partial<WorkData>
    team_size?: string | null;
    selectedTeamSize: string | null;
    selectedIntendedUse: string[];
    setSelectedIntendedUse: (
        selectedIntendedUse: string[]
    ) => void;
    token: string | null;
    setToken: (token: string) => void;
    setSelectedTeamSize: (
        selectedTeamSize: string | null
    ) => void;
    featuresData: FeaturesData
    setCurrentStep: (step: number) => void
    setSkippedStep: (step: number) => void
    setAboutData: (data: Partial<AboutData>) => void
    setWorkData: (data: Partial<WorkData>) => void
    setFeaturesData: (data: FeaturesData) => void
    submitAllData: () => Promise<void>
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
    currentStep: 0,
    skippedSteps: [],
    aboutData: {},
    workData: {},
    featuresData: [],
    team_size: null,
    selectedTeamSize: null,
    selectedIntendedUse: [],

    token: null,
    setToken: (token) => set({ token }),

    setSelectedIntendedUse: (selectedIntendedUse) => set({ selectedIntendedUse }),
    setSelectedTeamSize: (selectedTeamSize) => set({ selectedTeamSize }),

    setCurrentStep: (step) => set({ currentStep: step }),
    setSkippedStep: (step) =>
        set((state) => ({
            skippedSteps: [...state.skippedSteps, step],
        })),
    setAboutData: (data) =>
        set((state) => ({
            aboutData: { ...state.aboutData, ...data },
        })),
    setWorkData: (data) =>
        set((state) => ({
            workData: { ...state.workData, ...data },
        })),
    setFeaturesData: (data) => set({ featuresData: data }),

    submitAllData: async () => {
        const { aboutData, workData, featuresData, skippedSteps } = get()

        try {
            const formData = new FormData();
            aboutData?.name && formData.append("name", aboutData.name);
            workData?.company_role && formData.append("company_role", workData.company_role);
            workData?.industry && formData.append("industry", workData.industry);
            (get().selectedIntendedUse && get().selectedIntendedUse.length > 0) && formData.append("intended_use", JSON.stringify(get().selectedIntendedUse));
            get().selectedTeamSize && formData.append("team_size", JSON.stringify(get().selectedTeamSize));

            const response = await saveUserOnboarding({
                token: get().token ?? '',
                formData: formData
            })
            console.log(response)
            return response;
        } catch (error) {
            console.error("Error submitting data:", error)
            throw error
        }
    },
}))


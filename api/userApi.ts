// /api/urlApi.ts
import api from './api'; // Axios instance
import { API_V1_USER } from './apiConfig';

// Get all urls with pagination and search filters
export const saveUserOnboarding = async ({
    token,
    formData
}: {
    token: string;
    formData: FormData;
}) => {
    const response = await api.post(
        `${API_V1_USER}/save-user-onboarding`, formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response?.data?.data;
};
// Get all urls with pagination and search filters
export const getOnboardingStatus = async ({
    token
}: {
    token: string;
}) => {
    const response = await api.get(
        `${API_V1_USER}/get-onboarding-status`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response?.data?.data;
};
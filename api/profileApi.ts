// /api/urlApi.ts
import api from './api'; // Axios instance
import { API_V1_USER } from './apiConfig';

// Get all urls with pagination and search filters
export const getDisplayName = async ({
    token
}: {
    token: string;
}) => {
    const response = await api.get(
        `${API_V1_USER}/display-name`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response?.data?.data;
};
// Get all urls with pagination and search filters
export const updateDisplayName = async ({
    token,
    formData
}: {
    token: string;
    formData: FormData;
}) => {
    formData.append('_method', 'PUT')
    const response = await api.post(
        `${API_V1_USER}/display-name`, formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};
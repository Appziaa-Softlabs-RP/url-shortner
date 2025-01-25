// /api/OauthAppApi.ts
import api from './api'; // Axios instance
import { API_V1_USER } from './apiConfig';

// Get all OAuth apps with pagination and search filters
export const getOauthApps = async ({
    token,
    search = '',
    page = 1,
    limit = 100,
}: {
    token: string;
    search?: string;
    page?: number;
    limit?: number;
}) => {
    const response = await api.get(
        `${API_V1_USER}/oauth-apps?page=${page}&search=${search}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response?.data?.data;
};

// Create a new OAuth app
export const createOauthApp = async ({
    data,
    token,
}: {
    data: FormData;
    token: string;
}) => {
    const response = await api.post(`${API_V1_USER}/oauth-apps`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            ContentType: 'multipart/form-data',
        },
    });
    return response;
};

// Update an existing OAuth app
export const updateOauthApp = async ({
    id,
    data,
    token,
}: {
    id: string;
    data: FormData;
    token: string;
}) => {
    data.append('_method', 'PUT');
    const response = await api.post(`${API_V1_USER}/oauth-apps/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            ContentType: 'multipart/form-data',
        },
    });
    return response;
};

// Delete an OAuth app
export const deleteOauthApp = async ({
    id,
    token,
}: {
    id: string;
    token: string;
}) => {
    const response = await api.delete(`${API_V1_USER}/oauth-apps/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    return response;
};

// Get a specific OAuth app by ID
export const getOauthApp = async ({
    id,
    token,
}: {
    id: string;
    token: string;
}) => {
    const response = await api.get(`${API_V1_USER}/oauth-apps/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    return response.data.data;
};
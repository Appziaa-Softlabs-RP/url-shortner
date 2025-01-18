// /api/urlApi.ts
import api from './api'; // Axios instance
import { API_V1 } from './apiConfig';

// Get all urls with pagination and search filters
export const getUrls = async ({
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
        `${API_V1}/urls?page=${page}&search=${search}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response?.data?.data;
};

// Create a new url
export const createUrl = async ({
    data,
    token,
}: {
    data: FormData;
    token: string;
}) => {
    const response = await api.post(`${API_V1}/urls`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            ContentType: 'multipart/form-data',
        },
    });
    return response;
};

// Update an existing url
export const updateUrl = async ({
    id,
    data,
    token,
}: {
    id: number;
    data: FormData;
    token: string;
}) => {
    data.append('_method', 'PUT');
    const response = await api.post(`${API_V1}/urls/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            ContentType: 'multipart/form-data',
        },
    });
    return response;
};

// Delete a url
export const deleteUrl = async ({
    id,
    token,
}: {
    id: number;
    token: string;
}) => {
    const response = await api.delete(`${API_V1}/urls/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    return response;
};

// Get a specific url by ID
export const getUrl = async ({
    id,
    token,
}: {
    id: number;
    token: string;
}) => {
    const response = await api.get(`${API_V1}/urls/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    return response.data.data;
};
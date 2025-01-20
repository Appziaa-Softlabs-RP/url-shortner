// /api/urlApi.ts
import api from './api'; // Axios instance
import { API_V1, API_V1_USER } from './apiConfig';

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
        `${API_V1_USER}/urls?page=${page}&search=${search}&limit=${limit}`,
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
    const response = await api.post(`${API_V1_USER}/urls`, data, {
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
    short_code,
    data,
    token,
}: {
    short_code: string;
    data: FormData;
    token: string;
}) => {
    data.append('_method', 'PUT');
    const response = await api.post(`${API_V1_USER}/urls/${short_code}`, data, {
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
    shortCode,
    token,
}: {
    shortCode: string;
    token: string;
}) => {
    const response = await api.delete(`${API_V1_USER}/urls/${shortCode}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    return response;
};

// Get a specific url by ID
export const getUrl = async ({
    short_code,
    token,
}: {
    short_code: string;
    token: string;
}) => {
    const response = await api.get(`${API_V1_USER}/urls/${short_code}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    return response.data.data;
};

// Get a specific url by ID
export const getAllUrlsAnalytics = async ({
    token,
}: {
    token: string;
}) => {
    const response = await api.get(`${API_V1_USER}/get-analytics`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    return response.data.data;
};

// Get a specific url by ID
export const fetchPageTitle = async ({
    url,
}: {
    url: string;
}) => {
    const response = await api.post(`${API_V1}/fetch-title`, { url }, {
        headers: {
            Accept: 'application/json',
        }
    });
    return response.data.data;
};
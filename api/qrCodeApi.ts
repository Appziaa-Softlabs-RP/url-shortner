import api from './api';
import { API_V1, API_V1_USER } from './apiConfig';

// Get all qr-codes with pagination and search filters
export const getQrCodes = async ({
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
        `${API_V1_USER}/qr-codes?page=${page}&search=${search}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response?.data?.data;
};

// Create a new url
export const createQrCode = async ({
    data,
    token,
}: {
    data: FormData;
    token: string;
}) => {
    const response = await api.post(`${API_V1_USER}/qr-codes`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            ContentType: 'multipart/form-data',
        },
    });
    return response;
};

// Update an existing url
export const updateQrCode = async ({
    short_code,
    data,
    token,
}: {
    short_code: string;
    data: FormData;
    token: string;
}) => {
    data.append('_method', 'PUT');
    const response = await api.post(`${API_V1_USER}/qr-codes/${short_code}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            ContentType: 'multipart/form-data',
        },
    });
    return response;
};

// Delete a url
export const deleteQrCode = async ({
    shortCode,
    token,
}: {
    shortCode: string;
    token: string;
}) => {
    const response = await api.delete(`${API_V1_USER}/qr-codes/${shortCode}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    return response;
};

// Get a specific url by ID
export const getQrCode = async ({
    short_code,
    token,
}: {
    short_code: string;
    token: string;
}) => {
    const response = await api.get(`${API_V1_USER}/qr-codes/${short_code}`, {
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
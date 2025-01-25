// /api/api.ts
import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

// Create an Axios instance with a common base URL
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: 'application/json',
    },
});


// Response interceptor to handle errors and format them
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error)
        const formattedError = {
            message: error.response?.data?.message || 'An unexpected error occurred',
            status: error.response?.status || 500,
        };
        return Promise.reject(formattedError);
    }
);

export default api;
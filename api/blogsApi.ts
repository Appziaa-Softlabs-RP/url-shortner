// /api/urlApi.ts
import api from './api'; // Axios instance
import { BLOGS_API } from './apiConfig';

// Interface for paginated response
export interface CommonPaginatedResponse {
    last_page: number;
    per_page: number;
    data: any[];
}

export const getLatestBlogs = async () => {
    const response = await api.get(
        `${BLOGS_API}/blogs/latest`,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "email": process.env.NEXT_PUBLIC_BLOGS_EMAIL
            },
        }
    );
    return response?.data?.data;
};

// Get all blogs with pagination and search filters
export const getBlogs = async ({
    search = '',
    category = 'latest',
    limit = 100,
    order=null
}: {
    search?: string;
    category?: string;
    limit?: number;
    order?: string | null;
}): Promise<any> => {
    let url = `${BLOGS_API}/blogs?category=${category}&search=${search}&limit=${limit}`
    if(order){
        url += `&order=${order}`
    }
    const response = await api.get(
        url,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "email": process.env.NEXT_PUBLIC_BLOGS_EMAIL
            },
        }
    );
    return response.data.data;
};


// Get a specific blog by ID
export const getBlog = async ({
    slug,
}: {
    slug: string;
}): Promise<any> => {
    const response = await api.get(`${BLOGS_API}/blogs/${slug}`, {
        headers: {
            Accept: 'application/json',
            "email": process.env.NEXT_PUBLIC_BLOGS_EMAIL
        },
    });
    return response.data.data;
};

export const getAllBlog = async (): Promise<any> => {
    const response = await api.get(`${BLOGS_API}/blogs/all`, {
        headers: {
            Accept: 'application/json',
            "email": process.env.NEXT_PUBLIC_BLOGS_EMAIL
        },
    });
    return response.data.data;
};
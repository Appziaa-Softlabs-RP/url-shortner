export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    user_id: number;
    description: string;
    content: string;
    cover_image: string;
    status: string;
    meta_title: string;
    meta_description: string;
    created_at: string;
    updated_at: string;
    views: number;
    categories: Category[];
    tags: any[];
}

export interface Blog {
    id: number
    title: string
    slug: string
    description: string
    content: string
    cover_image: string
    status: string
    created_at: string
    updated_at: string
}

export interface Category {
    id: number
    name: string
    slug: string
    description: string
    status: number
    created_at: string
    updated_at: string
}

export interface BlogData {
    current_page: number
    data: Blog[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: {
        url: string | null
        label: string
        active: boolean
    }[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}


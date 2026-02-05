import apiClient from '@/src/lib/api-client';

export interface Tour {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: string;
    image: string;
    count_day?: number;
    date: number;
    category: {
        id: number;
        title: string;
    };
    is_popular: boolean;
    is_new: boolean;
    is_liked: boolean;
}

export interface LikedTourResponse {
    id: number;
    tour: Tour;
    created_at: string;
}

export interface ApiResponse<T> {
    status: boolean;
    data: {
        links: {
            previous: string | null;
            next: string | null;
        };
        total_items: number;
        total_pages: number;
        page_size: number;
        current_page: number;
        results: T[];
    };
}

export interface LikeToggleResponse {
    status: boolean;
    data: {
        detail: string;
        liked: boolean;
    };
}

const tourService = {
    getTours: async (params?: any): Promise<ApiResponse<Tour>> => {
        const response = await apiClient.get('/api/tour/', { params });
        return response.data;
    },

    toggleLike: async (tour_slug: string): Promise<LikeToggleResponse> => {
        const response = await apiClient.post('/UserLike/', { tour_slug });
        return response.data;
    },

    getLikedTours: async (): Promise<ApiResponse<LikedTourResponse>> => {
        const response = await apiClient.get('/UserLike/');
        return response.data;
    },
};

export default tourService;

import apiClient from '@/src/lib/api-client';

export interface RegisterData {
    first_name: string;
    email: string;
    password: string | number;
}

export interface LoginData {
    email: string;
    password: string | number;
}

export interface AuthResponse {
    status: boolean;
    data: {
        detail: string;
        token: {
            refresh: string;
            access: string;
        };
    };
}

export interface LoginResponse {
    refresh: string;
    access: string;
}

const authService = {
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/register/', data);
        return response.data;
    },

    login: async (data: LoginData): Promise<LoginResponse> => {
        const response = await apiClient.post('/auth/token/', data);
        return response.data;
    },

    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
        }
    },

    setTokens: (access: string, refresh: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
        }
    },

    getAccessToken: () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('access_token');
        }
        return null;
    },
};

export default authService;

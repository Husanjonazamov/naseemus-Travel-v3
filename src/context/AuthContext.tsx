'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/src/services/auth.service';

interface User {
    email: string;
    first_name?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (access: string, refresh: string, userData?: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
        router.push('/login');
    }, [router]);

    useEffect(() => {
        const checkTokenExpiration = () => {
            const accessToken = authService.getAccessToken();
            if (accessToken) {
                try {
                    const tokenData = accessToken.split('.')[1];
                    if (!tokenData) return false;
                    const payload = JSON.parse(atob(tokenData));
                    const exp = payload.exp * 1000;
                    if (Date.now() >= exp) {
                        console.warn('Token expired, logging out...');
                        logout();
                        return true;
                    }
                } catch (e) {
                    console.error('Failed to decode token', e);
                    logout();
                    return true;
                }
            }
            return false;
        };

        const initAuth = () => {
            if (checkTokenExpiration()) return;

            const accessToken = authService.getAccessToken();
            const savedUser = localStorage.getItem('user');

            if (accessToken) {
                if (savedUser) {
                    try {
                        setUser(JSON.parse(savedUser));
                    } catch (e) {
                        console.error('Failed to parse saved user', e);
                    }
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        initAuth();

        const interval = setInterval(checkTokenExpiration, 60000);
        return () => clearInterval(interval);
    }, [logout]);

    const login = (access: string, refresh: string, userData?: User) => {
        authService.setTokens(access, refresh);
        if (userData) {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        }
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

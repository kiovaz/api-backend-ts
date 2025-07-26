export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    cep: string;
    address?: string;
    weather?: string;
    role: 'admin' | 'user';
    created_at: string;
}

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    cep: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    cep: string;
    address?: string;
    role: 'admin' | 'user';
    created_at: string;
}

export interface AuthResponse {
    token: string;
    user: UserResponse;
    weather?: any;
}
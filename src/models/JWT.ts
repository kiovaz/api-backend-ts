import { Request } from 'express';

export interface JWTPayload {
    userId: number;
    email: string;
    role: 'admin' | 'user';
    iat?: number;
    exp?: number;
}

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
        email: string;
        role: 'admin' | 'user';
    };
}
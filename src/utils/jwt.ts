import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt';
import { JWTPayload } from '../models/JWT';

export const generateToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
    return jwt.sign(payload, JWT_CONFIG.secret!, { expiresIn: '24h' });
};

export const verifyToken = (token: string): JWTPayload => {
    return jwt.verify(token, JWT_CONFIG.secret!) as JWTPayload;
};
export const JWT_CONFIG = {
    secret: process.env.JWT_SECRET || 'fallback-secret',
    expiresIn: '15m',
    algorithm: 'HS256' as const
};
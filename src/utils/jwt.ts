import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'minha-chave-secreta';

export const generateToken = (user: { userId: number; email: string; role: 'admin' | 'user' }): string => {
    return jwt.sign(user, SECRET, { expiresIn: '15m' });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, SECRET);
};
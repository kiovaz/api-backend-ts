import { Request, Response } from 'express';
import db from '../config/database';
import { generateToken } from '../utils/jwt';
import { hashPassword, comparePassword } from '../utils/password';
import { CreateUserInput, LoginInput } from '../validations/userValidation';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, cep }: CreateUserInput = req.body;

        // Verificar se email já existe
        const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
        if (existingUser) {
            res.status(400).json({ error: 'Email já cadastrado' });
            return;
        }

        const hashedPassword = await hashPassword(password);

        // Inserir usuário
        const insert = db.prepare(`INSERT INTO users (name, email, password, cep) VALUES (?, ?, ?, ?)`);
        
        const result = insert.run(name, email, hashedPassword, cep);
        const userId = result.lastInsertRowid as number;

        // ✅ Não precisa buscar! Já sabemos que role = 'user' (default)
        const token = generateToken({
            userId,
            email,
            role: 'user'
        });

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            token,
            user: {
                id: userId,
                name,
                email,
                cep,
                role: 'user'
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password }: LoginInput = req.body;

        const user = db.prepare(`
            SELECT id, name, email, password, cep, address, weather, weather_updated_at, role, created_at 
            FROM users WHERE email = ?
        `).get(email) as any;

        if (!user) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }

        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }

        // ✅ CACHE INTELIGENTE - Atualizar clima se passou 1 hora
        let currentWeather = user.weather;
        const lastUpdate = user.weather_updated_at ? new Date(user.weather_updated_at) : null;
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 hora atrás

        // Se nunca atualizou OU passou 1 hora → buscar clima novo
        if (!lastUpdate || lastUpdate < oneHourAgo) {
            const weatherData = await getWeatherByCep(user.cep);
            if (weatherData) {
                db.prepare(`
                    UPDATE users SET weather = ?, weather_updated_at = ? WHERE id = ?
                `).run(JSON.stringify(weatherData), new Date().toISOString(), user.id);
                
                currentWeather = JSON.stringify(weatherData);
            }
        }

        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role
        });

        res.json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                cep: user.cep,
                address: user.address,
                weather: currentWeather ? JSON.parse(currentWeather) : null,
                role: user.role,
                created_at: user.created_at
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
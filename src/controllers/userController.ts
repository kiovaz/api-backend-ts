import { Request, Response } from 'express';
import db from '../config/database';
import { UpdateUserInput } from '../validations/userValidation';
import { AuthenticatedRequest } from '../models/JWT';

// ===== ROTAS DE USUÁRIO (precisa estar logado) =====

// Ver próprio perfil
export const getMyProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        const user = db.prepare(`
            SELECT id, name, email, cep, address, weather, role, created_at 
            FROM users WHERE id = ?
        `).get(userId) as any;

        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                cep: user.cep,
                address: user.address,
                weather: user.weather,
                role: user.role,
                created_at: user.created_at
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Atualizar próprio perfil
export const updateMyProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const { name, email, cep }: UpdateUserInput = req.body;

        // Verificar se email já existe (em outro usuário)
        if (email) {
            const existingUser = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?').get(email, userId);
            if (existingUser) {
                res.status(400).json({ error: 'Email já está em uso' });
                return;
            }
        }

        // Construir query dinamicamente
        const updateFields: string[] = [];
        const updateValues: any[] = [];

        if (name) {
            updateFields.push('name = ?');
            updateValues.push(name);
        }
        if (email) {
            updateFields.push('email = ?');
            updateValues.push(email);
        }
        if (cep) {
            updateFields.push('cep = ?');
            updateValues.push(cep);
        }

        if (updateFields.length === 0) {
            res.status(400).json({ error: 'Nenhum campo para atualizar' });
            return;
        }

        updateValues.push(userId);

        const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
        db.prepare(updateQuery).run(...updateValues);

        // Buscar usuário atualizado
        const updatedUser = db.prepare(`
            SELECT id, name, email, cep, address, weather, role, created_at
            FROM users WHERE id = ?
        `).get(userId) as any;

        res.json({
            message: 'Perfil atualizado com sucesso',
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                cep: updatedUser.cep,
                address: updatedUser.address,
                weather: updatedUser.weather,
                role: updatedUser.role,
                created_at: updatedUser.created_at
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Deletar própria conta
export const deleteMyAccount = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        const result = db.prepare('DELETE FROM users WHERE id = ?').run(userId);

        if (result.changes === 0) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        res.json({ message: 'Conta deletada com sucesso' });

    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// ===== ROTAS ADMIN (só admin acessa) =====

// Listar todos os usuários
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = db.prepare(`
            SELECT id, name, email, cep, address, weather, role, created_at 
            FROM users ORDER BY created_at DESC
        `).all() as any[];

        res.json({
            users: users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                cep: user.cep,
                address: user.address,
                weather: user.weather,
                role: user.role,
                created_at: user.created_at
            }))
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Ver usuário específico
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.params.id);

        if (isNaN(userId)) {
            res.status(400).json({ error: 'ID inválido' });
            return;
        }

        const user = db.prepare(`
            SELECT id, name, email, cep, address, weather, role, created_at 
            FROM users WHERE id = ?
        `).get(userId) as any;

        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                cep: user.cep,
                address: user.address,
                weather: user.weather,
                role: user.role,
                created_at: user.created_at
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Atualizar qualquer usuário
export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.params.id);
        const { name, email, cep }: UpdateUserInput = req.body;

        if (isNaN(userId)) {
            res.status(400).json({ error: 'ID inválido' });
            return;
        }

        // Verificar se usuário existe
        const existingUser = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
        if (!existingUser) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        // Verificar se email já existe (em outro usuário)
        if (email) {
            const emailExists = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?').get(email, userId);
            if (emailExists) {
                res.status(400).json({ error: 'Email já está em uso' });
                return;
            }
        }

        // Construir query dinamicamente
        const updateFields: string[] = [];
        const updateValues: any[] = [];

        if (name) {
            updateFields.push('name = ?');
            updateValues.push(name);
        }
        if (email) {
            updateFields.push('email = ?');
            updateValues.push(email);
        }
        if (cep) {
            updateFields.push('cep = ?');
            updateValues.push(cep);
        }

        if (updateFields.length === 0) {
            res.status(400).json({ error: 'Nenhum campo para atualizar' });
            return;
        }

        updateValues.push(userId);

        const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
        db.prepare(updateQuery).run(...updateValues);

        // Buscar usuário atualizado
        const updatedUser = db.prepare(`
            SELECT id, name, email, cep, address, weather, role, created_at 
            FROM users WHERE id = ?
        `).get(userId) as any;

        res.json({
            message: 'Usuário atualizado com sucesso',
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                cep: updatedUser.cep,
                address: updatedUser.address,
                weather: updatedUser.weather,
                role: updatedUser.role,
                created_at: updatedUser.created_at
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Deletar qualquer usuário
export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.params.id);

        if (isNaN(userId)) {
            res.status(400).json({ error: 'ID inválido' });
            return;
        }

        const result = db.prepare('DELETE FROM users WHERE id = ?').run(userId);

        if (result.changes === 0) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        res.json({ message: 'Usuário deletado com sucesso' });

    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


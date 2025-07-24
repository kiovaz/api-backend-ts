import { Router } from "express";
import { prisma } from "../lib/prisma";

export const router = Router();

// Rota GET / - Listar todos os usuários
router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao carregar usuários" });
    }
});

// Rota GET /:id - Obter usuário específico
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuário" });
    }
});

// Rota POST / - Criar novo usuário
router.post('/', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Nome e email são obrigatórios" });
    }

    try {
        const user = await prisma.user.create({
            data: { name, email }
        });
        res.status(201).json(user);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: "Email já cadastrado" });
        }
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
});

// Rota PUT /:id - Atualizar usuário
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name, email } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    if (!name || !email) {
        return res.status(400).json({ error: "Nome e email são obrigatórios" });
    }

    try {
        const user = await prisma.user.update({
            where: { id },
            data: { name, email }
        });
        res.status(200).json(user);
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
});

// Rota DELETE /:id - Remover usuário
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        await prisma.user.delete({
            where: { id }
        });
        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.status(500).json({ error: "Erro ao deletar usuário" });
    }
});
import { Router } from "express";
import { prisma } from "../lib/prisma";

export const router = Router();

router.get('/', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

router.post('/', async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = await prisma.user.create({
            data: { name, email}
        });

        res.status(201).json(user);
    } catch (error) {
        res.json(200).json({error: "Erro ao criar usuário"});
    }
});




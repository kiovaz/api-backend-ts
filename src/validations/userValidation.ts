import { z } from 'zod';

// Validação para registro de usuário
export const createUserSchema = z.object({
    name: z.string()
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres')
        .trim(),

    email: z.string()
        .email({ message: 'E-mail inválido' })
        .toLowerCase()
        .trim(),

    password: z.string()
        .min(8, 'Senha deve ter pelo menos 8 caracteres')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número'
        ),

    cep: z.string()
        .regex(/^\d{8}$/, 'CEP deve conter exatamente 8 dígitos')
        .transform(val => val.replace(/\D/g, ''))
});

// Validação para login
export const loginSchema = z.object({
    email: z.string()
        .email({ message: 'E-mail inválido' })
        .toLowerCase()
        .trim(),

    password: z.string()
        .min(1, 'Senha é obrigatória')
});

// Validação para atualização de usuário (SEM role)
export const updateUserSchema = z.object({
    name: z.string()
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres')
        .trim()
        .optional(),

    email: z.string()
        .email({ message: 'E-mail inválido' })
        .toLowerCase()
        .trim()
        .optional(),

    cep: z.string()
        .regex(/^\d{8}$/, 'CEP deve conter exatamente 8 dígitos')
        .transform(val => val.replace(/\D/g, ''))
        .optional()
});

// Validação de parâmetros de rota (ID)
export const userParamsSchema = z.object({
    id: z.string()
        .regex(/^\d+$/, 'ID deve ser um número válido')
        .transform(val => parseInt(val, 10))
});

// Tipos extraídos dos schemas Zod
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserParams = z.infer<typeof userParamsSchema>;
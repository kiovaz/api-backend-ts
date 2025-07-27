import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validate } from '../middleware/validation';
import { createUserSchema, loginSchema } from '../validations/userValidation';

const router = Router();

// Rotas públicas
router.post('/register', validate(createUserSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;
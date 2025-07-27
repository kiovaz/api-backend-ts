import { Router } from 'express';
import { 
    getMyProfile, 
    updateMyProfile, 
    deleteMyAccount,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
} from '../controllers/userController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { updateUserSchema } from '../validations/userValidation';

const router = Router();

// ===== ROTAS DE USUÁRIO (precisa estar logado) =====
router.get('/me', authenticateToken, getMyProfile);
router.put('/me', authenticateToken, validate(updateUserSchema), updateMyProfile);
router.delete('/me', authenticateToken, deleteMyAccount);

// ===== ROTAS ADMIN (só admin acessa) =====
router.get('/admin/users', authenticateToken, requireAdmin, getAllUsers);
router.get('/admin/users/:id', authenticateToken, requireAdmin, getUserById);
router.put('/admin/users/:id', authenticateToken, requireAdmin, validate(updateUserSchema), updateUserById);
router.delete('/admin/users/:id', authenticateToken, requireAdmin, deleteUserById);

export default router;
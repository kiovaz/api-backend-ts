import express from 'express';
import 'dotenv/config';
import './config/database';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());

// Conectar as rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

export default app;
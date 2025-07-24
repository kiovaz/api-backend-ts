import express from "express";
import { router } from './routes/users';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', router); // Usa o router de users

app.listen(PORT, () => {
    console.log(`\nServidor rodando na porta ${PORT}...`)
});

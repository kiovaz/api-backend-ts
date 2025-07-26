import Database from 'better-sqlite3';
import path from 'path';

const dbPath = process.env.DATABASE_PATH || './database.sqlite';
const fullPath = path.resolve(dbPath);

const db = new Database(fullPath);


// Criar tabela users com role
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    cep TEXT NOT NULL,
    address TEXT,
    weather TEXT,
    role TEXT NOT NULL DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

console.log(`✅ Banco SQLite conectado: ${fullPath}`);

export default db;


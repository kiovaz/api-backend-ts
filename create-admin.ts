// Script para criar o primeiro usuário administrador
import db from './src/config/database';
import { hashPassword } from './src/utils/password';

async function createAdminUser() {
  try {
    // Verificar se já existe um admin
    const existingAdmin = db.prepare(
      'SELECT id FROM users WHERE role = ? LIMIT 1'
    ).get('admin');

    if (existingAdmin) {
      console.log('❌ Já existe um usuário administrador!');
      process.exit(1);
    }

    // Dados do admin padrão
    const adminData = {
      name: 'Administrador',
      email: 'admin@exemplo.com',
      cep: '01310-100', // CEP de exemplo (Av. Paulista, SP)
      password: 'admin123'
    };

    console.log('🔐 Criando usuário administrador...');
    
    // Hash da senha
    const passwordHash = await hashPassword(adminData.password);
    
    // Inserir no banco
    const result = db.prepare(`
      INSERT INTO users (name, email, cep, password_hash, role)
      VALUES (?, ?, ?, ?, ?)
    `).run(adminData.name, adminData.email, adminData.cep, passwordHash, 'admin');

    console.log('✅ Usuário administrador criado com sucesso!');
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Senha:', adminData.password);
    console.log('🆔 ID:', result.lastInsertRowid);
    console.log('\n⚠️  IMPORTANTE: Altere a senha após o primeiro login!');
    
  } catch (error) {
    console.error('❌ Erro ao criar administrador:', error);
    process.exit(1);
  }
}

createAdminUser();

# 📚 **API Backend TypeScript - Documentação**

## **🚀 Configuração Inicial**

### **1. Instalar dependências:**
```bash
npm install
```

### **2. Configurar variáveis de ambiente:**
Edite o arquivo `.env`:
```env
JWT_SECRET=seu_jwt_secret_super_seguro_aqui_minimum_32_chars
OPENWEATHER_API_KEY=sua_chave_da_openweather_api_aqui
PORT=3000
```

### **3. Criar usuário administrador:**
```bash
npm run create-admin
```

### **4. Iniciar servidor:**
```bash
npm run dev
```

---

## **🔗 Endpoints da API**

### **🔐 Autenticação**

#### **POST /auth/register**
Registrar novo usuário
```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "cep": "01310-100",
  "password": "senha123"
}
```

#### **POST /auth/login**
Fazer login (retorna clima atualizado automaticamente)
```json
{
  "email": "joao@exemplo.com",
  "password": "senha123"
}
```

### **👤 Usuário**

#### **GET /user/me**
Obter perfil do usuário logado
```
Header: Authorization: Bearer <token>
```

#### **PUT /user/me**
Atualizar dados do usuário
```json
{
  "name": "João Santos",
  "cep": "04567-890"
}
```

#### **DELETE /user/me**
Deletar conta do usuário

### **👥 Administração (Admin apenas)**

#### **GET /user/admin/users**
Listar todos os usuários

#### **GET /user/admin/users/:id**
Obter usuário específico

#### **PUT /user/admin/users/:id**
Atualizar usuário específico

#### **DELETE /user/admin/users/:id**
Deletar usuário específico

---

## **🌤️ Funcionalidades Especiais**

### **Cache Inteligente de Clima**
- **Atualização automática**: O clima é atualizado automaticamente no login se passou mais de 1 hora
- **Tolerância a falhas**: Se a API do clima falhar, mantém os dados em cache
- **Performance**: Evita chamadas desnecessárias à API externa

### **Integração Externa**
- **ViaCEP**: Validação e busca de endereços por CEP
- **OpenWeather**: Dados meteorológicos atualizados

### **Segurança**
- **JWT**: Tokens seguros com expiração configurável
- **Bcrypt**: Hash seguro de senhas
- **Roles**: Sistema de permissões (user/admin)
- **Validação**: Entrada validada com Zod

---

## **🛠️ Estrutura do Projeto**

```
src/
├── app.ts              # Configuração principal do Express
├── config/
│   ├── database.ts     # Configuração SQLite
│   └── jwt.ts          # Configuração JWT
├── controllers/
│   ├── authController.ts    # Login/Registro
│   └── userController.ts    # CRUD usuários
├── middleware/
│   ├── auth.ts         # Autenticação JWT
│   └── validation.ts   # Validação de entrada
├── models/
│   ├── User.ts         # Interfaces TypeScript
│   └── JWT.ts          # Types JWT
├── routes/
│   ├── authRoutes.ts   # Rotas de autenticação
│   └── userRoutes.ts   # Rotas de usuário
├── services/
│   ├── viaCep.ts       # Integração ViaCEP
│   └── openWeather.ts  # Integração OpenWeather
├── utils/
│   ├── jwt.ts          # Utilitários JWT
│   └── password.ts     # Utilitários senha
└── validations/
    └── userValidation.ts    # Schemas Zod
```

---

## **📋 Scripts Disponíveis**

```bash
npm run dev          # Iniciar em modo desenvolvimento
npm run build        # Compilar TypeScript
npm run start        # Iniciar versão compilada
npm run setup        # Instalar deps + criar admin
npm run create-admin # Criar usuário administrador
```

---

## **🔧 Tecnologias Utilizadas**

- **Node.js 18+** - Runtime JavaScript
- **Express 5** - Framework web
- **TypeScript 5** - Tipagem estática
- **Better-SQLite3** - Banco de dados local
- **JWT** - Autenticação stateless
- **Bcrypt** - Hash de senhas
- **Zod** - Validação de entrada
- **Axios** - Cliente HTTP

---

## **⚡ Próximos Passos Sugeridos**

1. **Testes automatizados** com Jest
2. **Rate limiting** para segurança
3. **Logs estruturados** com Winston
4. **Swagger/OpenAPI** para documentação interativa
5. **Docker** para containerização
6. **CI/CD** com GitHub Actions

# 🚀 API Backend TypeScript

**Última atualização**: `25 de julho de 2025`  
**Repositório**: `https://github.com/kiovaz/api-backend-ts`  
**Responsável**: `Caio Vasconcelos`

---

## 📌 **Visão Geral**

Sistema de gerenciamento de usuários com:

- ✅ Autenticação JWT
- 📦 CRUD completo de usuários
- 🌐 Integração com APIs externas (ViaCEP + OpenWeather)
- 🧪 Testes automatizados
- 📚 Documentação Swagger
- 🔒 Validação de dados com Zod

---

## 🔧 **Stack Tecnológica**

| Tecnologia       | Versão  | Finalidade                          |
|------------------|---------|-------------------------------------|
| Node.js          | 18.x    | Ambiente de execução                |
| Express          | 4.x     | Framework HTTP                      |
| TypeScript       | 5.x     | Tipagem estática                    |
| Better-SQLite3   | 8.x     | Banco de dados local                |
| jsonwebtoken     | 9.x     | Autenticação JWT                    |
| Axios            | 1.x     | Consumo de APIs externas            |
| Bcrypt           | 5.x     | Hash de senhas                      |
| Zod              | 3.x     | Validação de dados                  |
| Jest             | 29.x    | Testes automatizados                |
| Swagger UI       | 5.x     | Documentação interativa             |

---

## 🗄️ **Modelo de Dados**

### Tabela `users`

| Campo       | Tipo        | Descrição                     |
|-------------|-------------|-------------------------------|
| `id`        | INTEGER (PK)| ID autoincrement              |
| `name`      | TEXT        | Nome completo                 |
| `email`     | TEXT (UNIQUE)| E-mail                       |
| `password`  | TEXT        | Senha hasheada (bcrypt)       |
| `cep`       | TEXT        | CEP para consulta             |
| `address`   | TEXT        | Endereço completo (ViaCEP)    |
| `weather`   | TEXT        | Dados climáticos (JSON)       |
| `created_at`| DATETIME    | Data de criação               |

---

## 🔐 **Fluxo de Autenticação**

### **Cadastro de Usuário**:
1. Usuário envia dados (name, email, password, cep)
2. Sistema valida dados com Zod
3. Consulta endereço via ViaCEP
4. Hash da senha com bcrypt
5. Salva usuário no banco SQLite

### **Login**:
1. Usuário envia credenciais (email, password)
2. Sistema valida credenciais
3. Consulta dados climáticos via OpenWeather
4. Gera token JWT
5. Retorna token + dados do usuário + clima

---

## 🌐 **Endpoints**

### 🔓 **Rotas Públicas**

| Método | Rota           | Body (JSON)                        | Response                      |
|--------|----------------|------------------------------------|-------------------------------|
| POST   | `/auth/register` | `{name, email, password, cep}`     | `201: {user, message}`        |
| POST   | `/auth/login`    | `{email, password}`                | `200: {token, user, weather}` |

### 🔐 **Rotas Protegidas**

| Método | Rota           | Headers                            | Response              |
|--------|----------------|------------------------------------|-----------------------|
| GET    | `/users`       | `Authorization: Bearer <token>`    | `200: [users]`        |
| GET    | `/users/:id`   | `Authorization: Bearer <token>`    | `200: {user}`         |
| PUT    | `/users/:id`   | `Authorization: Bearer <token>`    | `200: {updatedUser}`  |
| DELETE | `/users/:id`   | `Authorization: Bearer <token>`    | `204: No Content`     |

---

## 🧪 **Estrutura de Testes**

```
tests/
├── integration/
│   ├── auth.test.ts
│   └── users.test.ts
├── unit/
│   ├── utils/
│   │   ├── password.test.ts
│   │   └── jwt.test.ts
│   └── services/
│       ├── viacep.test.ts
│       └── openweather.test.ts
├── mocks/
│   └── users.mock.ts
└── setup.ts
```

### **Exemplo de Teste**

```typescript
describe("POST /auth/register", () => {
  it("should reject duplicate emails", async () => {
    const userData = {
      name: "João Silva",
      email: "existente@test.com",
      password: "MinhaSenh@123",
      cep: "01001000"
    };

    const res = await request(app)
      .post("/auth/register")
      .send(userData);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("E-mail já cadastrado");
  });
});
```

---

## 📚 **Documentação Swagger**

### **Configuração**

```typescript
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Management API",
      version: "1.0.0",
      description: "API para gerenciamento de usuários com integração de CEP e clima"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desenvolvimento"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./src/routes/*.ts"]
};
```

### **Acesso**
📖 Documentação disponível em: `http://localhost:3000/api-docs`

---

## 📦 **Instalação e Execução**

### **1. Clonagem e Instalação**
```bash
git clone https://github.com/kiovaz/api-backend-ts.git
cd api-backend-ts
npm install
```

### **2. Configuração de Ambiente**
```bash
# Criar arquivo .env
cp .env.example .env

# Configurar variáveis
JWT_SECRET=sua-chave-secreta-super-segura
OPENWEATHER_API_KEY=sua-chave-openweather
PORT=3000
```

### **3. Scripts Disponíveis**
```bash
# Desenvolvimento com hot reload
npm run dev

# Compilar TypeScript
npm run build

# Executar versão compilada
npm start

# Executar testes
npm test

# Testes com coverage
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

### **4. Estrutura do Projeto**
```
src/
├── config/          # Configurações (DB, JWT, APIs)
├── controllers/     # Lógica de negócio
├── middleware/      # Middlewares (auth, validação)
├── models/          # Interfaces TypeScript
├── routes/          # Definições de rotas
├── services/        # Integrações externas
├── utils/           # Funções utilitárias
├── validations/     # Schemas Zod
└── app.ts           # Configuração do Express
```

---

## 🔧 **Tecnologias e Bibliotecas**

### **Dependências Principais**
- **Express**: Framework web minimalista
- **Better-SQLite3**: Driver SQLite síncrono e performático
- **jsonwebtoken**: Implementação JWT
- **bcrypt**: Hash seguro de senhas
- **zod**: Validação de schema type-safe
- **axios**: Cliente HTTP para APIs externas

### **Dependências de Desenvolvimento**
- **TypeScript**: Superset tipado do JavaScript
- **Jest**: Framework de testes
- **Supertest**: Testes de integração HTTP
- **Swagger**: Documentação de API

---

## 🌟 **Funcionalidades**

- 🔐 **Autenticação segura** com JWT e bcrypt
- 📍 **Integração ViaCEP** para busca automática de endereços
- 🌤️ **Integração OpenWeather** para dados climáticos
- ✅ **Validação robusta** com Zod
- 🧪 **Cobertura de testes** completa
- 📚 **Documentação interativa** com Swagger
- 🛡️ **Segurança** com middlewares adequados

---

## 📞 **Contato**

**Desenvolvedor**: Caio Vasconcelos
**Email**: caiovasconcelos01@live.com
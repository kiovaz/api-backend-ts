<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,3,4,5&height=300&section=header&text=WeatherUser%20API&fontSize=80&fontColor=ffffff&animation=fadeIn&fontAlignY=30&desc=Intelligent%20Management%20System%20with%20Climate%20Integration&descAlignY=51&descSize=18)

<br>

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="60" alt="TypeScript">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="60" alt="Node.js">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="60" alt="Express">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" width="60" alt="SQLite">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" width="60" alt="NPM">
</p>

<br>

</div>

## 🌍 **About the Project**

<div align="center">


</div>

**WeatherUser API** is a RESTful API that combines user management with weather data. It allows registration, authentication, and querying of weather information based on the user's location.

<div align="center">

### 🎯 **Features**

<table>
<tr>
<td align="center" width="20%">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Globe%20Showing%20Americas.png" width="80"/>
  <br><b>Smart Location</b>
  <br><sub>CEP → Automatic address via ViaCEP</sub>
</td>
<td align="center" width="20%">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Sun%20Behind%20Cloud.png" width="80"/>
  <br><b>Real-Time Weather</b>
  <br><sub>Integrated OpenWeather API</sub>
</td>
<td align="center" width="20%">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Shield.png" width="80"/>
  <br><b>Security</b>
  <br><sub>JWT + bcrypt + middleware</sub>
</td>
<td align="center" width="20%">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gear.png" width="80"/>
  <br><b>Performance</b>
  <br><sub>Optimized SQLite</sub>
</td>
<td align="center" width="20%">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Memo.png" width="80"/>
  <br><b>Pure TypeScript</b>
  <br><sub>100% type safety</sub>
</td>
</tr>
</table>

</div>

### ✨ **Highlights**

<table>
<tr>
<td width="50%" valign="top">

#### 🎯 **Core**

- 🔐 **JWT Authentication** with refresh tokens
- 👤 **Complete and robust User Management**
- 🌍 **Auto Address Resolution** via Brazilian CEP
- 🌤️ **Personalized Real-time Weather Data**
- ✅ **Zod Validation** at all layers
- 🛡️ **Multi-layer Security Middleware**

</td>
<td width="50%" valign="top">

#### ⚡ **Engineering**

- 🚀 **SQLite3** with optimized queries
- 📊 **Intelligent and contextual Error Handling**
- 🔄 **Retry Logic** for external APIs
- 💾 **Reliable Data Persistence**
- 🎨 **Clean Architecture** SOLID principles
- 📝 **TypeScript** for maximum reliability

</td>
</tr>
</table>

---

## ⚡ **Installation**

<div align="center">

</div>

```bash
# 🌟 Clone the repository
git clone https://github.com/kiovaz/weatheruser-api.git && cd weatheruser-api

# 📦 Install all dependencies
npm install

# 🔧 Configure your credentials
cp .env.example .env
# ✏️ Edit the .env with your OPENWEATHER_API_KEY

# 🚀 Start your API
npm run dev
```

<div align="center">

### 🎉 **Ready! API running at `http://localhost:3000`**

</div>

---

## 🏗️ **Architecture**

<div align="center">

### 🎨 **Design Pattern**

```mermaid
flowchart TD
  subgraph "🌐 CLIENT"
    A[🖥️ Web Client]
  end

  subgraph "⚡ API GATEWAY"
    E[🚪 Express Router]
    F[🛡️ Auth Middleware]
    G[✅ Zod Validator]
  end

  subgraph "🎯 BUSINESS LOGIC"
    I[👤 User Controller]
    J[🔐 Auth Controller]
    K[🌤️ Weather Service]
    L[📍 Location Service]
  end

  subgraph "💾 DATA PERSISTENCE"
    M[🗄️ SQLite Database]
  end

  subgraph "🌍 EXTERNAL APIs"
    P[📮 ViaCEP Service]
    Q[🌡️ OpenWeather API]
  end

  A --> E
  E --> F
  F --> G
  G --> I
  G --> J

  I --> K
  I --> L
  J --> M
  I --> M

  K --> Q
  L --> P

  style A fill:#e3f2fd,stroke:#1976d2
  style E fill:#f3e5f5,stroke:#7b1fa2
  style F fill:#fff3e0,stroke:#f57c00
  style G fill:#e8f5e8,stroke:#388e3c
  style I fill:#fce4ec,stroke:#c2185b
  style J fill:#fce4ec,stroke:#c2185b
  style K fill:#e0f2f1,stroke:#00796b
  style L fill:#e0f2f1,stroke:#00796b
  style M fill:#f1f8e9,stroke:#689f38
  style P fill:#fff3e0,stroke:#f57c00
  style Q fill:#e1f5fe,stroke:#0288d1
```

</div>

### 📂 **Project Structure**

```plaintext
📦 weatheruser-api/
```
📦 weatheruser-api/
├── 📁 src/
│   ├── ⚙️ config/           # Database and JWT configuration
│   │   ├── 🗄️ database.ts
│   │   └── 🔑 jwt.ts
│   ├── 🧑‍💻 controllers/    # Endpoint logic
│   │   ├── 👤 userController.ts
│   │   └── 🔐 authController.ts
│   ├── 🛡️ middleware/       # Auth and validation middlewares
│   │   ├── 🔒 auth.ts
│   │   └── ✅ validation.ts
│   ├── 🗂️ models/           # Data models
│   │   ├── 👤 User.ts
│   │   └── 🌤️ Weather.ts
│   ├── 🚏 routes/           # Application routes
│   │   ├── 🔐 auth.ts
│   │   └── 👥 users.ts
│   ├── 🔌 services/         # External integrations (ViaCEP, OpenWeather)
│   │   ├── 🏤 viacep.ts
│   │   └── ☁️ openweather.ts
│   ├── 🛠️ utils/            # Utilities (bcrypt, logger, etc)
│   │   ├── 🔑 bcrypt.ts
│   │   └── 📋 logger.ts
│   ├── 📏 validations/      # Validation schemas (Zod)
│   │   ├── 👤 userSchemas.ts
│   │   └── 🔐 authSchemas.ts
│   └── 🚀 app.ts            # Application entry point
│
├── 📄 docs/                 # Extra documentation
└── 📦 package.json          # Project dependencies and scripts
```

---

## 📊 **Tech Stack**

<div align="center">

### 🎨 **Technologies Used**

<table>
<tr>
<td align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="60"/><br>
  <b>TypeScript</b><br>
  <sub>Main Language</sub>
</td>
<td align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="60"/><br>
  <b>Node.js</b><br>
  <sub>Runtime Environment</sub>
</td>
<td align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="60"/><br>
  <b>Express.js</b><br>
  <sub>Web Framework</sub>
</td>
<td align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" width="60"/><br>
  <b>SQLite</b><br>
  <sub>Database</sub>
</td>
</tr>
<tr>
<td align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" width="60"/><br>
  <b>Jest</b><br>
  <sub>Testing Framework</sub>
</td>
<td align="center">
  <img src="https://jwt.io/img/pic_logo.svg" width="60"/><br>
  <b>JWT</b><br>
  <sub>Authentication</sub>
</td>
<td align="center">
  <img src="https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg" width="60"/><br>
  <b>Zod</b><br>
  <sub>Schema Validation</sub>
</td>
<td align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" width="60"/><br>
  <b>NPM</b><br>
  <sub>Package Manager</sub>
</td>
</tr>
</table>

### 🌐 **Integrated External APIs**

<table>
<tr>
<td align="center" width="50%">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Cityscape.png" width="80"/><br>
  <b>ViaCEP</b><br>
  <sub>Brazilian CEP lookup</sub>
</td>
<td align="center" width="50%">
  <img src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_60x60.png" width="60"/><br>
  <b>OpenWeather</b><br>
  <sub>Global weather data</sub>
</td>
</tr>
</table>

</div>

---

## 📡 **Endpoints**

<div align="center">

### 🌐 **Full API Documentation**

</div>

### 🔓 **Public Endpoints**

<table>
<tr>
<td width="50%">

#### 📝 **User Registration**

```http
POST /auth/register
Content-Type: application/json
```

```json
{
  "name": "Maria Silva",
  "email": "maria@email.com", 
  "password": "MinhaSenh@123",
  "cep": "01310-100"
}
```

**✅ Success Response (201):**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "Maria Silva",
      "email": "maria@email.com",
      "address": "Av. Paulista, 1578 - Bela Vista, São Paulo - SP",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

</td>
<td width="50%">

#### 🔐 **User Login**

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "maria@email.com",
  "password": "MinhaSenh@123"
}
```

**✅ Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "Maria Silva",
      "email": "maria@email.com"
    },
    "weather": {
      "location": "São Paulo, SP",
      "temperature": 24,
      "description": "Partly cloudy",
      "humidity": 68,
      "windSpeed": 12
    }
  }
}
```

</td>
</tr>
</table>

### 🔒 **Protected Endpoints** (Requires JWT Token)

| Method | Endpoint | Description | Parameters |
|:------:|:---------|:------------|:-----------|
| **GET** | `/users` | List all users | `Authorization: Bearer <token>` |
| **GET** | `/users/:id` | Get specific user | `id` (path parameter) |  
| **PUT** | `/users/:id` | Update user data | `id` + body with fields to update |
| **DELETE** | `/users/:id` | Permanently remove user | `id` (path parameter) |

#### 🔍 **Example: Get User**

```http
GET /users/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**✅ Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Maria Silva",
      "email": "maria@email.com",
      "address": "Av. Paulista, 1578 - Bela Vista, São Paulo - SP",
      "weather": {
        "temperature": 24,
        "description": "Partly cloudy",
        "lastUpdate": "2024-01-15T14:22:00Z"
      }
    }
  }
}
```

---

## 💡 **Examples**

<div align="center">


</div>

<table>
<tr>
<td width="50%">



</td>
<td width="50%">

---

## ⚙️ **Configuration**

### 🌍 **Environment Variables**

```env
# 🌐 Server Configuration
PORT=3000

# 🔐 Security & Authentication
JWT_SECRET=your-super-secure-secret-key-here

# 🌤️ External API Keys
OPENWEATHER_API_KEY=your-openweather-api-key

# 💾 Database
DATABASE_PATH=./database.sqlite
```

### 🛠️ **Available Scripts**

```bash
# 🔥 Development
npm run dev          # Starts server with hot-reload

# 📦 Production  
npm run build        # Compiles TypeScript to JavaScript
npm start            # Starts production server

# 🧪 Tests
npm test             # Runs tests with Jest
npm run test:watch   # Tests in watch mode

# 💄 Formatting
npm run format       # Formats code with Prettier
```


## **Developer**

<div align="center">

<img src="https://github.com/kiovaz.png" width="150" style="border-radius: 75px;"/>

### **Caio Vasconcelos**

*Backend Developer*

<br>

<a href="https://github.com/kiovaz">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Desktop%20Computer.png" width="40"/>
</a>&ensp;
</div>

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,3,4,5&height=120&section=footer)

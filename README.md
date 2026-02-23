# ✦ GlowUp — User Management API

A production-ready REST API built with **Node.js**, **Express.js**, and **PostgreSQL**, featuring JWT authentication, a Neo-Brutalism styled web frontend, and interactive Swagger documentation.

---

## ⚡ Features

### 🔧 Backend
- 🔐 JWT authentication with access & refresh token rotation
- 📋 Full CRUD operations with pagination
- 🔒 Password hashing with bcrypt (10 salt rounds)
- ✅ Joi input validation with custom error messages
- 🛡️ Rate limiting (100 req/15min general, 5 req/15min auth)
- 🪖 Security headers via Helmet.js
- 🌐 CORS configuration
- 🗄️ SQL injection prevention with parameterized queries
- 📦 Standardized JSON responses
- 📝 Request logging middleware
- ⚠️ Global error handling
- 💚 Health check endpoint

### 🎨 Frontend
- 🖼️ Neo-Brutalism design (Space Grotesk, bold borders, offset shadows)
- 🏠 Landing page with live API response preview
- 🔑 Authentication pages (login & register)
- 📊 Dashboard with Overview, Users, and API Tester panels
- 📄 Custom styled Swagger UI at `/api-docs`
- 🔔 Toast notifications and custom modals

### 🐳 DevOps
- 🐋 Docker & Docker Compose with health checks
- 🗃️ Database schema auto-applied on first run (`db/init.sql`)
- 🔧 Environment-based configuration

---

## 🖼️ Screenshots

### 🏠 Homepage
![Homepage](https://github.com/user-attachments/assets/3cbb411a-d185-4ce5-a2a6-ec904eb769ae)

### 🔑 Login
![Login](https://github.com/user-attachments/assets/9f1bff44-9f43-4e8f-a40d-4cd7759ec74c)

### 📝 Register
![Register](https://github.com/user-attachments/assets/86f17e36-187d-47f2-9064-b5bd9f39e914)

### 📊 Dashboard — Overview
![Dashboard Overview](https://github.com/user-attachments/assets/51b68403-b209-4244-a025-7897e5bfaa5f)

### 👥 Dashboard — Users
![Dashboard Users](https://github.com/user-attachments/assets/5363bbc8-42a2-409b-9ef6-be1ad09e8dd0)

### ➕ Add User Modal
![Add User](https://github.com/user-attachments/assets/5ec6dd03-c83a-42a4-8d78-65bee3d032f3)

### ⚡ API Tester
![API Tester](https://github.com/user-attachments/assets/b57bb03d-3acf-444f-8fa5-28652e2d501f)

### 📄 API Docs
![API Docs](https://github.com/user-attachments/assets/78ded2d0-cb67-4d76-88a7-373345282009)

---

## 📂 Project Structure

```
glowup-backend/
├── config/
│   ├── database.js          # PostgreSQL connection pool
│   └── swagger.js           # OpenAPI spec configuration
├── controllers/
│   ├── auth.controller.js
│   └── user.controller.js
├── services/
│   ├── auth.service.js
│   ├── user.service.js
│   └── token.service.js
├── routes/
│   ├── auth.routes.js
│   └── user.routes.js
├── middlewares/
│   ├── authMiddleware.js    # JWT verification
│   ├── validateWithJoi.js  # Joi validation middleware
│   ├── rateLimiter.js
│   ├── logger.js
│   └── errorHandler.js
├── validators/
│   ├── auth.validator.js
│   └── user.validator.js
├── utils/
│   └── response.js          # Standardized response helpers
├── public/
│   ├── css/
│   │   ├── style.css        # Global Neo-Brutalism styles
│   │   └── swagger.css      # Custom Swagger UI theme
│   ├── js/
│   │   └── api.js           # Frontend API client
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── dashboard.html
├── db/
│   └── init.sql             # Database schema (auto-applied via Docker)
├── __tests__/
│   ├── unit/
│   │   ├── middlewares/validateWithJoi.test.js
│   │   └── services/
│   │       ├── auth.service.test.js
│   │       └── token.service.test.js
│   └── integration/
│       ├── auth.routes.test.js
│       └── user.routes.test.js
├── .env.example
├── .dockerignore
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── app.js
├── server.js
└── package.json
```

---

## 🛠️ Technologies

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web framework |
| PostgreSQL | Database |
| pg | PostgreSQL client |
| jsonwebtoken | JWT generation & verification |
| bcrypt | Password hashing |
| Joi | Input validation |
| Helmet.js | Security headers |
| express-rate-limit | Rate limiting |
| swagger-ui-express | API documentation UI |
| swagger-jsdoc | OpenAPI spec generator |
| dotenv | Environment variables |
| Docker | Containerization |

---

## 🚀 Getting Started

### Prerequisites

- 🐳 Docker & Docker Compose
- 🟢 Node.js v18+ (for local development without Docker)

### Quick Start with Docker

```bash
git clone https://github.com/bilgenurpala/glowup-backend.git
cd glowup-backend
cp .env.example .env
docker-compose up -d
```

The database schema is automatically applied on first run. No manual SQL needed.

Open in browser:
- 🌐 **Frontend:** `http://localhost:3000`
- 📄 **API Docs:** `http://localhost:3000/api-docs`
- 💚 **Health:** `http://localhost:3000/health`

### Local Development (Without Docker)

```bash
# Start only the database via Docker
docker-compose up -d db

# Install dependencies
npm install

# Set DB_HOST=localhost in .env
npm run dev
```

---

## 🔧 Environment Variables

Copy `.env.example` to `.env` and fill in your values:

| Variable | Description | Docker Default |
|----------|-------------|----------------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `DB_HOST` | Database host | `db` (Docker) / `localhost` (local) |
| `DB_PORT` | Database port | `5432` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `postgres123` |
| `DB_NAME` | Database name | `appdb` |
| `JWT_SECRET` | JWT signing secret | — |
| `JWT_ACCESS_TOKEN_EXPIRES_IN` | Access token lifetime | `15m` |
| `JWT_REFRESH_TOKEN_EXPIRES_IN` | Refresh token lifetime | `7d` |
| `CORS_ORIGIN` | Allowed origins | `*` |

---

## 📡 API Endpoints

### 🔑 Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login, receive tokens | No |
| POST | `/auth/refresh` | Refresh access token | No |
| POST | `/auth/logout` | Invalidate refresh token | No |
| GET | `/auth/me` | Get current user profile | Yes |

### 👥 Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/users` | List users (paginated) | No |
| POST | `/users` | Create user | No |
| PUT | `/users/:id` | Update user | Yes |
| DELETE | `/users/:id` | Delete user | Yes |

### 🔩 Utility

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api-docs` | Swagger UI |

#### Pagination

```
GET /users?page=1&limit=10
```

- `page` — Page number (default: 1)
- `limit` — Results per page (default: 50, max: 100)

---

## 📖 API Reference

### Register

```http
POST /auth/register
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "Test1234"
}
```

**Validation:** name (2–50 chars), valid email, password (min 6 chars, uppercase + lowercase + number)

**Response 201:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "created_at": "2026-02-22T10:00:00.000Z",
    "updated_at": "2026-02-22T10:00:00.000Z"
  }
}
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "Test1234"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "id": 1, "name": "Jane Doe", "email": "jane@example.com" },
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  }
}
```

### Protected Routes

Include the access token in the `Authorization` header:

```http
Authorization: Bearer <accessToken>
```

### Refresh Token

```http
POST /auth/refresh
Content-Type: application/json

{ "refreshToken": "eyJhbGci..." }
```

### Get All Users

```http
GET /users?page=1&limit=10
```

**Response 200:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": {
    "users": [ ... ],
    "page": 1,
    "limit": 10
  }
}
```

---

## 🔐 Authentication Flow

```
Register  →  Hash password (bcrypt)  →  Store user in DB

Login     →  Verify password
          →  Generate access token (15m) + refresh token (7d)
          →  Store refresh token in DB
          →  Return tokens + user

Protected →  Verify Bearer token signature + expiry
Route     →  Proceed or return 401

Refresh   →  Verify refresh token
          →  Delete old token from DB
          →  Issue new access + refresh tokens

Logout    →  Delete refresh token from DB
```

---

## 🗄️ Database Schema

### users

| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(50) | NOT NULL |
| email | VARCHAR(255) | UNIQUE |
| password | VARCHAR(255) | — |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | DEFAULT NOW() |

### refresh_tokens

| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| user_id | INTEGER | FK → users(id) ON DELETE CASCADE |
| token | TEXT | UNIQUE, NOT NULL |
| expires_at | TIMESTAMP | NOT NULL |
| created_at | TIMESTAMP | DEFAULT NOW() |

Indexes: `idx_users_email`, `idx_refresh_tokens_token`, `idx_refresh_tokens_user_id`

---

## 📦 Response Format

```json
{ "success": true, "message": "...", "data": { } }
{ "success": false, "message": "...", "errors": null }
```

### Common Error Codes

| Status | Meaning |
|--------|---------|
| 400 | Validation error |
| 401 | Missing or invalid token |
| 403 | Forbidden |
| 404 | Resource not found |
| 409 | Email already registered |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

---

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# Start only the database
docker-compose up -d db

# View logs
docker-compose logs -f api
docker-compose logs -f db

# Rebuild after code changes
docker-compose down && docker-compose up -d --build

# PostgreSQL shell
docker exec -it postgres-db psql -U postgres -d appdb

# Database backup / restore
docker exec postgres-db pg_dump -U postgres appdb > backup.sql
docker exec -i postgres-db psql -U postgres -d appdb < backup.sql
```

---

## 🧪 Running Tests

```bash
npm test
npm run test:coverage
```

Tests cover:
- Unit: `auth.service`, `token.service`, `validateWithJoi` middleware
- Integration: auth routes, user routes (with mocked DB and rate limiter)

---

## 🔄 Middleware Execution Order

```
Helmet → CORS → Rate Limiter → JSON Parser → Logger
→ Router → Auth Middleware (protected) → Joi Validation
→ Controller → Service → PostgreSQL → Response → Error Handler
```

---

## 🐛 Troubleshooting

**🔴 `ECONNREFUSED` on startup**
- Running locally? Make sure `docker-compose up -d db` is running and `DB_HOST=localhost` in `.env`.

**🔴 `EADDRINUSE: port 3000`**
- Another Node process is running. Find and kill it:
  ```bash
  netstat -ano | findstr :3000
  taskkill //F //PID <pid>
  ```

**🔴 Port resolves to wrong value**
- Windows system env vars can override `.env`. The server uses `dotenv` with `{ override: true }` to prevent this.

**🔴 JWT errors**
- Ensure `JWT_SECRET` is set in `.env`
- Token format must be `Authorization: Bearer <token>`
- Check that the token hasn't expired (access tokens last 15 minutes)

**🔴 CORS errors from frontend**
- Set `CORS_ORIGIN` in `.env` to your frontend URL:
  ```env
  CORS_ORIGIN=http://localhost:5173
  ```

---

## 👤 Developer

**Bilgenur Pala**
- 🐙 GitHub: [@bilgenurpala](https://github.com/bilgenurpala)
- 💼 LinkedIn: [bilgenur-pala](https://www.linkedin.com/in/bilgenur-pala-892a1a225/)

---

## 📄 License

MIT

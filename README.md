# 🌟 GlowUp Backend API

A modern, production-ready REST API backend built with **Node.js**, **Express.js**, **PostgreSQL**, and **JWT Authentication**. Features enterprise-grade security with Helmet.js, CORS, rate limiting, Joi validation, refresh token mechanism, comprehensive error handling, and interactive Swagger documentation.

## 🚀 Key Features

### Core Features
- ✅ **RESTful API** design following industry best practices
- ✅ **CRUD operations** (Create, Read, Update, Delete)
- ✅ **PostgreSQL database** with persistent data storage
- ✅ **JWT Authentication** with access + refresh token mechanism
- ✅ **Password hashing** using bcrypt (10 salt rounds)
- ✅ **Protected routes** with authentication middleware
- ✅ **Docker Compose** for easy deployment
- ✅ **Environment variables** for secure configuration
- ✅ **Interactive API documentation** with Swagger UI

### Security Features 🔒
- ✅ **Helmet.js** - Security headers (XSS, clickjacking, MIME sniffing protection)
- ✅ **CORS** - Cross-Origin Resource Sharing configuration
- ✅ **Rate Limiting** - DDoS and brute force attack prevention
- ✅ **Joi Validation** - Advanced input validation with custom error messages
- ✅ **Refresh Token Rotation** - Secure token management with database storage
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **Input Validation** - Type checking and sanitization
- ✅ **Error Sanitization** - No sensitive data in error responses

### Architecture & Code Quality
- ✅ **MVC Pattern** (Controller-Service architecture)
- ✅ **Separation of concerns** across layers
- ✅ **Standardized API responses** with success/error formatting
- ✅ **Advanced input validation** with Joi schemas
- ✅ **Global error handling** with detailed error messages
- ✅ **Request logging** middleware
- ✅ **SQL injection prevention** with parameterized queries
- ✅ **Data sanitization** and type checking

## 📂 Project Structure

```
glowup-backend/
├── config/
│   ├── database.js              # PostgreSQL connection pool
│   └── swagger.js               # Swagger/OpenAPI configuration
├── controllers/
│   ├── auth.controller.js       # Authentication logic (register, login)
│   └── user.controller.js       # User management logic
├── services/
│   ├── auth.service.js          # Auth business logic & DB queries
│   ├── user.service.js          # User business logic & DB queries
│   └── token.service.js         # Token generation & management
├── routes/
│   ├── auth.routes.js           # Authentication endpoints
│   └── user.routes.js           # User management endpoints
├── middlewares/
│   ├── authMiddleware.js        # JWT token verification
│   ├── validateUser.js          # Input validation
│   ├── validateWithJoi.js       # Joi validation middleware
│   ├── rateLimiter.js           # Rate limiting configuration
│   ├── logger.js                # Request logging
│   └── errorHandler.js          # Global error handling
├── validators/
│   ├── auth.validator.js        # Auth endpoint Joi schemas
│   └── user.validator.js        # User endpoint Joi schemas
├── utils/
│   └── response.js              # Standardized response helper
├── .env                         # Environment variables (not in git)
├── .gitignore
├── docker-compose.yml           # Docker services configuration
├── Dockerfile                   # API container definition
├── app.js                       # Express app configuration
├── server.js                    # Server entry point
├── package.json
└── README.md
```

## 🛠️ Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | JavaScript runtime | v18+ |
| **Express.js** | Web application framework | ^4.18.0 |
| **PostgreSQL** | Relational database | 14+ |
| **JWT** | Authentication tokens | - |
| **bcrypt** | Password hashing | ^5.1.0 |
| **Joi** | Input validation | ^17.x |
| **Helmet** | Security headers | ^7.1.0 |
| **CORS** | Cross-origin support | ^2.8.5 |
| **express-rate-limit** | Rate limiting | ^7.1.0 |
| **swagger-ui-express** | API documentation UI | ^5.x |
| **swagger-jsdoc** | Swagger spec generator | ^6.x |
| **pg** | PostgreSQL client | ^8.11.0 |
| **dotenv** | Environment variables | ^16.3.0 |
| **Docker** | Containerization | - |
| **Docker Compose** | Multi-container orchestration | - |

## 📦 Installation & Setup

### Prerequisites

- **Docker** and **Docker Compose** installed
- **Node.js** v18+ (for local development)
- **Git**

### Quick Start with Docker (Recommended)

1. **Clone the repository:**
```bash
git clone https://github.com/bilgenurpala/glowup-backend.git
cd glowup-backend
```

2. **Create `.env` file:**
```bash
# Copy and edit with your values
cp .env.example .env
```

Or create `.env` manually:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres123
DB_NAME=appdb

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
JWT_ACCESS_TOKEN_EXPIRES_IN=15m
JWT_REFRESH_TOKEN_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=*
```

3. **Start with Docker Compose:**
```bash
docker-compose up -d
```

4. **Create database tables:**
```bash
docker exec -it postgres-db psql -U postgres -d appdb
```

Then run:
```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Refresh tokens table
CREATE TABLE refresh_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  token VARCHAR(500) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);

\q
```

5. **Verify everything is running:**
```bash
docker-compose logs -f api
```

You should see:
```
✅ Connected to PostgreSQL database
Server running on port 3000
```

6. **Access Swagger API Documentation:**
```
http://localhost:3000/api-docs
```

7. **Test the API:**
```bash
curl http://localhost:3000/users
```

### Local Development (Without Docker)

1. **Install PostgreSQL locally**

2. **Create database:**
```bash
psql -U postgres
CREATE DATABASE glowup_db;
\q
```

3. **Install dependencies:**
```bash
npm install
```

4. **Update `.env` for local setup:**
```env
DB_HOST=localhost
```

5. **Run the server:**
```bash
npm run dev
```

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|------------|
| POST | `/auth/register` | Register new user | No | 5/15min |
| POST | `/auth/login` | Login and get tokens | No | 5/15min |
| POST | `/auth/refresh` | Refresh access token | No | 100/15min |
| POST | `/auth/logout` | Logout (invalidate token) | No | 100/15min |
| GET | `/auth/me` | Get current user profile | Yes | 100/15min |

### User Management Endpoints

| Method | Endpoint | Description | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|------------|
| GET | `/users` | Get all users (with optional limit) | No | 100/15min |
| POST | `/users` | Create a new user | No | 100/15min |
| PUT | `/users/:id` | Update user by ID | Yes | 100/15min |
| DELETE | `/users/:id` | Delete user by ID | Yes | 100/15min |

## 🔒 Security Features

### 1. Helmet.js Security Headers

Automatically adds the following headers to protect against common web vulnerabilities:

| Header | Value | Protection |
|--------|-------|------------|
| `Content-Security-Policy` | default-src 'self' | XSS attacks |
| `X-Content-Type-Options` | nosniff | MIME sniffing |
| `X-Frame-Options` | SAMEORIGIN | Clickjacking |
| `Strict-Transport-Security` | max-age=31536000 | Force HTTPS |
| `X-DNS-Prefetch-Control` | off | DNS prefetch |
| `Referrer-Policy` | no-referrer | Referrer leakage |

### 2. CORS Configuration

**Allowed Origins:** Configurable via `CORS_ORIGIN` environment variable  
**Allowed Methods:** GET, POST, PUT, DELETE  
**Allowed Headers:** Content-Type, Authorization  
**Credentials:** Enabled

**Production Example:**
```env
CORS_ORIGIN=https://yourfrontend.com,https://app.yourfrontend.com
```

### 3. Rate Limiting

**General API Routes:**
- 100 requests per 15 minutes per IP address
- Returns 429 status when exceeded

**Auth Routes (login, register):**
- 5 requests per 15 minutes per IP address
- Strict limit to prevent brute force attacks

**Response Headers:**
- `RateLimit-Limit` - Maximum requests allowed
- `RateLimit-Remaining` - Requests remaining in window
- `RateLimit-Reset` - Timestamp when limit resets
- `Retry-After` - Seconds to wait (when rate limited)

**Rate Limited Response (429):**
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again after 15 minutes",
  "errors": null
}
```

### 4. Joi Validation

**Advanced Input Validation:**
- Password pattern validation (uppercase, lowercase, number required)
- Email format validation
- String length validation (min/max)
- Custom error messages
- Unknown field stripping
- Type coercion

**Example Validation Rules:**
```javascript
// Password must contain:
- At least 6 characters
- One uppercase letter
- One lowercase letter
- One number
```

### 5. Refresh Token Mechanism

**Token Strategy:**
- **Access Token:** 15 minutes (short-lived, secure)
- **Refresh Token:** 7 days (long-lived, stored in database)
- **Token Rotation:** New tokens generated on each refresh
- **Database Storage:** Refresh tokens stored in PostgreSQL
- **Invalidation:** Tokens deleted on logout

**Benefits:**
- Enhanced security with short-lived access tokens
- Seamless user experience (no frequent re-login)
- Token revocation capability
- Protection against token theft

## 📖 API Documentation

### Swagger UI

Interactive API documentation available at:
```
http://localhost:3000/api-docs
```

**Features:**
- ✅ Try out endpoints directly from browser
- ✅ View request/response schemas
- ✅ Test authentication with JWT tokens
- ✅ See all error responses
- ✅ Copy cURL commands

### 1. Register a New User

**Request:**
```http
POST /auth/register
Content-Type: application/json

{
  "name": "Bilgenur Pala",
  "email": "bilgenur@example.com",
  "password": "Test1234"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "Bilgenur Pala",
    "email": "bilgenur@example.com",
    "created_at": "2025-01-30T10:30:00.000Z",
    "updated_at": "2025-01-30T10:30:00.000Z"
  }
}
```

**Validation Rules:**
- Name: Required, 2-50 characters
- Email: Required, valid email format, unique
- Password: Required, minimum 6 characters, must contain uppercase, lowercase, and number

---

### 2. Login

**Request:**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "bilgenur@example.com",
  "password": "Test1234"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "Bilgenur Pala",
      "email": "bilgenur@example.com",
      "created_at": "2025-01-30T10:30:00.000Z",
      "updated_at": "2025-01-30T10:30:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Note:** Save both `accessToken` and `refreshToken` for authenticated requests!

---

### 3. Refresh Access Token

**Request:**
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Tokens refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 4. Logout

**Request:**
```http
POST /auth/logout
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": null
}
```

---

### 5. Get Current User Profile (Protected)

**Request:**
```http
GET /auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User profile fetched successfully",
  "data": {
    "id": 1,
    "name": "Bilgenur Pala",
    "email": "bilgenur@example.com",
    "created_at": "2025-01-30T10:30:00.000Z",
    "updated_at": "2025-01-30T10:30:00.000Z"
  }
}
```

---

### 6. Get All Users

**Request:**
```http
GET /users
GET /users?limit=10
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Bilgenur Pala",
      "email": "bilgenur@example.com",
      "created_at": "2025-01-30T10:30:00.000Z",
      "updated_at": "2025-01-30T10:30:00.000Z"
    }
  ]
}
```

---

### 7. Update User (Protected)

**Request:**
```http
PUT /users/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Bilgenur Updated"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User updated",
  "data": {
    "id": 1,
    "name": "Bilgenur Updated",
    "email": "bilgenur@example.com",
    "created_at": "2025-01-30T10:30:00.000Z",
    "updated_at": "2025-01-30T12:45:00.000Z"
  }
}
```

---

### 8. Delete User (Protected)

**Request:**
```http
DELETE /users/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User deleted",
  "data": {
    "id": 1,
    "name": "Bilgenur Pala",
    "email": "bilgenur@example.com",
    "created_at": "2025-01-30T10:30:00.000Z",
    "updated_at": "2025-01-30T10:30:00.000Z"
  }
}
```

## 🔐 Authentication Flow

```
1. Register
   POST /auth/register
   → Password validated (Joi schema)
   → Password hashed with bcrypt
   → User stored in PostgreSQL
   
2. Login
   POST /auth/login
   → Credentials validated with Joi
   → Password compared with hash
   → Access token generated (15 min)
   → Refresh token generated (7 days)
   → Refresh token stored in database
   → Return both tokens + user info
   
3. Access Protected Routes
   Add header: Authorization: Bearer <accessToken>
   
4. Refresh Access Token (when expired)
   POST /auth/refresh
   → Verify refresh token signature
   → Check token in database
   → Check expiration
   → Generate new access token
   → Generate new refresh token
   → Delete old refresh token
   → Store new refresh token
   → Return new tokens
   
5. Logout
   POST /auth/logout
   → Delete refresh token from database
   → Client discards both tokens
```

## 🗃️ Database Schema

### Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing user ID |
| name | VARCHAR(50) | NOT NULL | User's full name |
| email | VARCHAR(255) | UNIQUE | User's email (login) |
| password | VARCHAR(255) | - | Hashed password (bcrypt) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Account creation time |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update time |

### Refresh Tokens Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing token ID |
| user_id | INTEGER | NOT NULL, FK | References users(id) |
| token | VARCHAR(500) | UNIQUE, NOT NULL | JWT refresh token |
| expires_at | TIMESTAMP | NOT NULL | Token expiration time |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Token creation time |

**Indexes:**
- Primary Key on `id`
- Unique constraint on `email` (users)
- Unique constraint on `token` (refresh_tokens)
- Index on `user_id` (refresh_tokens)
- Index on `token` (refresh_tokens)

## 🎨 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": null
}
```

## ⚠️ Error Examples

### 400 - Validation Error
```json
{
  "success": false,
  "message": "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  "errors": null
}
```

### 401 - Unauthorized (No Token)
```json
{
  "success": false,
  "message": "Access token is required",
  "errors": null
}
```

### 401 - Invalid Refresh Token
```json
{
  "success": false,
  "message": "Invalid or expired refresh token",
  "errors": null
}
```

### 403 - Forbidden (Invalid Token)
```json
{
  "success": false,
  "message": "Invalid token",
  "errors": null
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "User not found",
  "errors": null
}
```

### 409 - Conflict (Duplicate Email)
```json
{
  "success": false,
  "message": "Email already registered",
  "errors": null
}
```

### 429 - Too Many Requests (Rate Limited)
```json
{
  "success": false,
  "message": "Too many authentication attempts, please try again after 15 minutes",
  "errors": null
}
```

## 🧪 Testing

### Using Swagger UI (Recommended)

1. Navigate to `http://localhost:3000/api-docs`
2. Click on any endpoint
3. Click "Try it out"
4. Fill in request body/parameters
5. Click "Execute"
6. View response

**For Protected Endpoints:**
1. Login via `/auth/login` to get access token
2. Click "Authorize" button (top right)
3. Enter: `Bearer YOUR_ACCESS_TOKEN`
4. Click "Authorize"
5. Now all protected endpoints will include the token

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"Test1234"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Test1234"}'
```

**Refresh Token:**
```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"YOUR_REFRESH_TOKEN"}'
```

**Get Profile (Protected):**
```bash
curl -X GET http://localhost:3000/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Logout:**
```bash
curl -X POST http://localhost:3000/auth/logout \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"YOUR_REFRESH_TOKEN"}'
```

**Delete User (Protected):**
```bash
curl -X DELETE http://localhost:3000/users/1 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Test Rate Limit:**
```bash
# Run this 6 times quickly to trigger rate limit on auth endpoint
for i in {1..6}; do
  curl -X POST http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}'
done
```

### Using Postman / Thunder Client

1. **Register** → POST `/auth/register` with JSON body
2. **Login** → POST `/auth/login` → Copy the `accessToken` from response
3. **Protected Routes** → Add header: `Authorization: Bearer <accessToken>`

## 🏗️ Architecture

### Middleware Stack (Execution Order)

```
1. Helmet.js           → Security headers
2. CORS                → Cross-origin handling
3. Rate Limiter        → Request throttling
4. express.json()      → Parse JSON body
5. Logger              → Log request
6. Swagger UI          → API documentation (if /api-docs)
7. Router              → Match route
8. Auth Middleware     → Verify JWT (if protected)
9. Joi Validation      → Validate input schema
10. Controller         → Handle request
11. Service            → Business logic
12. Database           → PostgreSQL
13. Response           → Send standardized JSON
14. Error Handler      → Catch errors
```

### Request Flow
```
Client Request
    ↓
Helmet (add security headers)
    ↓
CORS (check origin)
    ↓
Rate Limiter (check request count)
    ↓
Parse JSON body
    ↓
Logger Middleware (logs request)
    ↓
Route Handler
    ↓
Authentication Middleware (if protected route)
    ↓
Joi Validation Middleware
    ↓
Controller (handles request/response)
    ↓
Service (business logic + database queries)
    ↓
PostgreSQL Database
    ↓
Response (standardized format)
```

### Layer Responsibilities

1. **Routes Layer** (`routes/`)
   - Define API endpoints
   - Apply middleware to routes
   - Map URLs to controllers

2. **Middleware Layer** (`middlewares/`)
   - **authMiddleware**: JWT token verification
   - **validateUser**: Input validation
   - **validateWithJoi**: Joi schema validation
   - **rateLimiter**: Request rate limiting
   - **logger**: Request logging
   - **errorHandler**: Global error handling

3. **Controller Layer** (`controllers/`)
   - Handle HTTP requests/responses
   - Input validation
   - Call service methods
   - Return standardized responses

4. **Service Layer** (`services/`)
   - Business logic
   - Database operations
   - Independent of HTTP layer (reusable)

5. **Database Layer** (`config/`)
   - PostgreSQL connection pool
   - Connection management

## 🔐 Security Features Implemented

### Password Security
- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ Password pattern validation (Joi)
- ✅ Passwords never stored in plain text
- ✅ Passwords never returned in API responses
- ✅ Password minimum: 6 characters + uppercase + lowercase + number

### Token Security
- ✅ Access tokens expire after 15 minutes
- ✅ Refresh tokens expire after 7 days
- ✅ Refresh tokens stored in database
- ✅ Token rotation on refresh
- ✅ Tokens invalidated on logout
- ✅ JWT signed with secret key

### API Security
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - bcrypt with salt rounds
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **XSS Protection** - Helmet CSP headers
- ✅ **CSRF Protection** - CORS configuration
- ✅ **Rate Limiting** - DDoS prevention
- ✅ **Input Validation** - Joi schemas
- ✅ **Environment Variables** - Sensitive data in .env
- ✅ **Error Message Sanitization** - No sensitive data in errors
- ✅ **Token Expiration** - Configurable JWT expiry

### Best Practices
- Passwords never stored in plain text
- Passwords never returned in API responses
- Token required for protected routes
- Unique email constraint
- Request logging for monitoring

## 🐳 Docker Commands

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f api
docker-compose logs -f db
```

### Rebuild After Code Changes
```bash
docker-compose down
docker-compose up -d --build
```

### Access PostgreSQL Shell
```bash
docker exec -it postgres-db psql -U postgres -d appdb
```

### Database Backup
```bash
docker exec postgres-db pg_dump -U postgres appdb > backup.sql
```

### Database Restore
```bash
docker exec -i postgres-db psql -U postgres -d appdb < backup.sql
```

## 📊 Request Logging

Every request is automatically logged with:
```
POST /auth/register 201 - 145ms
POST /auth/login 200 - 89ms
POST /auth/refresh 200 - 34ms
GET /auth/me 200 - 12ms
PUT /users/1 200 - 34ms
DELETE /users/1 401 - 5ms
POST /auth/login 429 - 3ms (rate limited)
```

## 🎯 Development Roadmap

### Completed ✅
- [x] RESTful API design
- [x] MVC architecture (Controller-Service pattern)
- [x] PostgreSQL database integration
- [x] JWT authentication
- [x] Password hashing (bcrypt)
- [x] Protected routes
- [x] Input validation middleware
- [x] Global error handling
- [x] Request logging
- [x] Standardized responses
- [x] Docker Compose setup
- [x] Environment variables
- [x] SQL injection prevention
- [x] **Helmet.js security headers**
- [x] **CORS configuration**
- [x] **Rate limiting**
- [x] **Joi validation**
- [x] **Refresh token mechanism**
- [x] **Swagger API documentation**

### In Progress 🔄
- [ ] User roles and permissions (Admin/User)
- [ ] Password reset functionality

### Planned 📋
- [ ] Email verification
- [ ] Unit tests (Jest)
- [ ] Integration tests
- [ ] Pagination for list endpoints
- [ ] Filtering and sorting
- [ ] File upload support
- [ ] Redis for session management
- [ ] CI/CD pipeline
- [ ] Deployment guide (AWS/Heroku)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| NODE_ENV | Environment | development |
| DB_HOST | Database host | db (Docker) or localhost |
| DB_PORT | Database port | 5432 |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | yourpassword |
| DB_NAME | Database name | appdb |
| JWT_SECRET | JWT signing secret | your-secret-key |
| JWT_ACCESS_TOKEN_EXPIRES_IN | Access token expiration | 15m |
| JWT_REFRESH_TOKEN_EXPIRES_IN | Refresh token expiration | 7d |
| **CORS_ORIGIN** | **Allowed CORS origins** | **\* or https://yourfrontend.com** |

## 🐛 Troubleshooting

### Issue: Container fails to start
```bash
# Check logs
docker-compose logs api

# Rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

### Issue: Database connection error
```bash
# Check if database is running
docker ps

# Check database logs
docker-compose logs db

# Verify DB_HOST in .env (should be 'db' for Docker)
```

### Issue: JWT token errors
- Ensure JWT_SECRET is set in .env
- Check token format: `Authorization: Bearer <token>`
- Verify token hasn't expired

### Issue: Joi validation errors not showing

**Solution:** Check that `validateWithJoi` middleware is applied to routes:
```javascript
router.post('/register', validateWithJoi(registerSchema), controller.register);
```

### Issue: Refresh token not working

**Solution:** Ensure refresh_tokens table exists and check token expiration:
```sql
SELECT * FROM refresh_tokens WHERE token = 'YOUR_TOKEN';
```

### Issue: CORS errors from frontend
**Solution:** Update CORS_ORIGIN in .env to include your frontend URL
```env
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

### Issue: Rate limit blocking legitimate requests
**Solution:** Adjust rate limits in `middlewares/rateLimiter.js`
```javascript
max: 200, // Increase from 100
windowMs: 15 * 60 * 1000 // Keep 15 minutes
```

## 👤 Developer

**Bilgenur Pala**
- GitHub: [@bilgenurpala](https://github.com/bilgenurpala)
- LinkedIn: [@bilgenurpala](https://www.linkedin.com/in/bilgenur-pala-892a1a225/)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Express.js community
- PostgreSQL team
- Node.js contributors
- JWT.io for JWT debugging
- Joi validation library
- Helmet.js for security
- Swagger/OpenAPI specification
- Docker community

---

⭐ **If you find this project helpful, please give it a star!**

**Built with ❤️ using Node.js, Express.js, PostgreSQL, JWT, Joi, Helmet, Swagger, and Docker**

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)
- [Joi Validation](https://joi.dev/api/)
- [Helmet.js Documentation](https://helmetjs.github.io/)
- [CORS Documentation](https://www.npmjs.com/package/cors)
- [Swagger/OpenAPI Specification](https://swagger.io/specification/)
- [express-rate-limit Documentation](https://www.npmjs.com/package/express-rate-limit)
- [Docker Documentation](https://docs.docker.com/)
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)

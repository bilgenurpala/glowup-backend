# 🌟 GlowUp Backend

A modern and professional REST API backend project built with Express.js and PostgreSQL, featuring a clean architecture with controller-service pattern, comprehensive validation, and robust error handling.

## 🚀 Features

- ✅ RESTful API design
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ **PostgreSQL database integration** with persistent storage
- ✅ Professional project structure (Controller-Service pattern)
- ✅ Standardized response format
- ✅ Request logging middleware
- ✅ Input validation middleware
- ✅ Global error handling
- ✅ Route validation (ID parameters)
- ✅ Data sanitization
- ✅ 404 handler for undefined routes
- ✅ Environment variables (.env)
- ✅ Docker-ready PostgreSQL setup

## 📂 Project Structure

```
glowup-backend/
├── config/
│   └── database.js              # PostgreSQL connection pool
├── controllers/
│   └── user.controller.js       # Request/Response logic
├── services/
│   └── user.service.js          # Business logic & database queries
├── routes/
│   └── user.routes.js           # API endpoint definitions
├── middlewares/
│   ├── logger.js                # Request logging
│   ├── validateUser.js          # Input validation
│   └── errorHandler.js          # Global error handling
├── utils/
│   └── response.js              # Standardized response helper
├── .env                         # Environment variables (not in git)
├── .gitignore
├── app.js                       # Express app configuration
├── server.js                    # Server entry point
├── package.json
└── README.md
```

## 🛠️ Technologies

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client for Node.js
- **dotenv** - Environment variable management

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher) or Docker

### 1. Clone the repository:
```bash
git clone https://github.com/bilgenurpala/glowup-backend.git
cd glowup-backend
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Setup PostgreSQL:

**Option A: Using Docker (Recommended)**
```bash
docker run --name glowup-postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=glowup_db \
  -p 5432:5432 \
  -d postgres:14
```

**Option B: Local PostgreSQL Installation**
- Install PostgreSQL from https://www.postgresql.org/download/
- Create database:
```bash
psql -U postgres
CREATE DATABASE glowup_db;
\q
```

### 4. Create Users Table:
```bash
docker exec -it glowup-postgres psql -U postgres -d glowup_db
```

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\q
```

### 5. Environment Variables:

Create `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=mysecretpassword
DB_NAME=glowup_db
```

**⚠️ Important:** Update `DB_PASSWORD` with your actual PostgreSQL password!

### 6. Start the server:
```bash
npm run dev
```

The server will run at `http://localhost:3000`

You should see:
```
✅ Connected to PostgreSQL database
Server running on port 3000
```

## 📡 API Endpoints

### Users

| Method | Endpoint | Description | Validation |
|--------|----------|-------------|------------|
| GET | `/users` | Get all users | Query param: limit (optional) |
| GET | `/users?limit=10` | Get first 10 users | Limit must be a number |
| POST | `/users` | Create a new user | Name required (2-50 chars) |
| PUT | `/users/:id` | Update a user | Valid ID + Name (2-50 chars) |
| DELETE | `/users/:id` | Delete a user | Valid ID required |

### Example Requests

**Create User:**
```bash
POST /users
Content-Type: application/json

{
  "name": "Bilge"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User created",
  "data": {
    "id": 1,
    "name": "Bilge",
    "created_at": "2025-01-27T10:30:00.000Z",
    "updated_at": "2025-01-27T10:30:00.000Z"
  }
}
```

**Update User:**
```bash
PUT /users/1
Content-Type: application/json

{
  "name": "Bilge Nur"
}
```

**Delete User:**
```bash
DELETE /users/1
```

**Get All Users:**
```bash
GET /users
```

## 🗃️ Database Schema

### Users Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(50) | NOT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

## 📋 Response Format

### Success Response:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error message",
  "errors": null
}
```

## ✅ Validation Rules

### User Name:
- ✅ Required field
- ✅ Must be a string
- ✅ Minimum 2 characters
- ✅ Maximum 50 characters
- ✅ Automatically trimmed (whitespace removed)

### User ID:
- ✅ Must be a positive integer
- ✅ Must be greater than 0

### Validation Error Examples:

**Missing Name:**
```json
POST /users
{}

Response (400):
{
  "success": false,
  "message": "Name is required",
  "errors": null
}
```

**Name Too Short:**
```json
POST /users
{"name": "A"}

Response (400):
{
  "success": false,
  "message": "Name must be at least 2 characters",
  "errors": null
}
```

**Invalid ID:**
```json
PUT /users/abc

Response (400):
{
  "success": false,
  "message": "Invalid user ID",
  "errors": null
}
```

**User Not Found:**
```json
DELETE /users/999

Response (404):
{
  "success": false,
  "message": "User not found",
  "errors": null
}
```

**Route Not Found:**
```json
GET /invalid-route

Response (404):
{
  "success": false,
  "message": "Route not found",
  "errors": null
}
```

## 🧪 Testing

You can test the project using Postman, Thunder Client, or curl.

**Example with curl:**
```bash
# Get all users
curl http://localhost:3000/users

# Create a new user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Bilge"}'

# Update a user
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Bilge Nur"}'

# Delete a user
curl -X DELETE http://localhost:3000/users/1

# Test validation error
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"A"}'
```

## 🏗️ Architecture

### Data Flow:
```
Request → Logger → Route → Validation → Controller → Service → PostgreSQL
                                ↓
                          Error Handler (if error)
```

### Layers:

1. **Routes Layer** (`routes/`)
   - Defines API endpoints
   - Applies middleware to routes
   - Maps URLs to controllers

2. **Middleware Layer** (`middlewares/`)
   - **Logger**: Logs all requests with method, URL, status, and response time
   - **Validation**: Validates input data before reaching controller
   - **Error Handler**: Catches and formats all errors globally

3. **Controller Layer** (`controllers/`)
   - Handles HTTP request/response
   - Performs input validation
   - Calls appropriate service methods
   - Returns standardized responses
   - All methods are async (await service calls)

4. **Service Layer** (`services/`)
   - Contains business logic
   - Executes database queries using parameterized statements
   - Independent of HTTP layer (reusable)
   - Returns data or null

5. **Database Layer** (`config/`)
   - PostgreSQL connection pool
   - Connection error handling
   - Environment-based configuration

6. **Utils Layer** (`utils/`)
   - Helper functions
   - Response formatters

## 🔒 Error Handling

The application includes comprehensive error handling:

- **Global Error Handler**: Catches all errors and returns consistent format
- **404 Handler**: Returns proper response for undefined routes
- **Validation Errors**: Returns 400 status with descriptive messages
- **Not Found Errors**: Returns 404 status when resource doesn't exist
- **Database Errors**: Caught and forwarded to error handler
- **Try-Catch Blocks**: All async controllers wrapped in try-catch

## 🔐 Security Features

- **SQL Injection Prevention**: Parameterized queries ($1, $2, etc.)
- **Environment Variables**: Sensitive data in .env (not in git)
- **Input Validation**: All user inputs validated before processing
- **Data Sanitization**: Trimming whitespace, type checking

## 📊 Request Logging

Every request is automatically logged with:
- HTTP Method (GET, POST, PUT, DELETE)
- Request URL
- Response Status Code
- Response Time (in milliseconds)

Example log output:
```
✅ Connected to PostgreSQL database
Server running on port 3000
GET /users -> 200 (12ms)
POST /users -> 201 (28ms)
PUT /users/1 -> 200 (15ms)
DELETE /users/999 -> 404 (8ms)
```

## 🐳 Docker Usage

### Start PostgreSQL Container:
```bash
docker start glowup-postgres
```

### Stop PostgreSQL Container:
```bash
docker stop glowup-postgres
```

### View Container Logs:
```bash
docker logs glowup-postgres
```

### Access PostgreSQL Shell:
```bash
docker exec -it glowup-postgres psql -U postgres -d glowup_db
```

### Backup Database:
```bash
docker exec glowup-postgres pg_dump -U postgres glowup_db > backup.sql
```

### Restore Database:
```bash
docker exec -i glowup-postgres psql -U postgres -d glowup_db < backup.sql
```

## 🎯 Development Roadmap

### Completed ✅
- [x] RESTful API design
- [x] Controller-Service pattern
- [x] Input validation middleware
- [x] Global error handling
- [x] Request logging
- [x] Standardized responses
- [x] **PostgreSQL database integration**
- [x] **Environment variables**
- [x] **Persistent data storage**
- [x] **Docker setup**

### In Progress 🔄
- [ ] Authentication (JWT)
- [ ] User roles and permissions

### Planned 📋
- [ ] Advanced validation library (Joi/Zod)
- [ ] Unit tests (Jest)
- [ ] Integration tests
- [ ] API documentation (Swagger)
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Security headers (Helmet.js)
- [ ] Password hashing (bcrypt)
- [ ] Email service
- [ ] File upload support
- [ ] Pagination improvements
- [ ] Filtering and sorting
- [ ] API versioning
- [ ] Database migrations
- [ ] Seeding scripts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

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

---

⭐ If you find this project helpful, please give it a star!

**Built with ❤️ using Node.js, Express.js, and PostgreSQL**
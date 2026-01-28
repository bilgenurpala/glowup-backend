# 🌟 GlowUp Backend

A modern and professional REST API backend project built with Express.js, featuring a clean architecture with controller-service pattern, comprehensive validation, and robust error handling.

## 🚀 Features

- ✅ RESTful API design
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Professional project structure (Controller-Service pattern)
- ✅ Standardized response format
- ✅ Request logging middleware
- ✅ **Input validation middleware**
- ✅ **Global error handling**
- ✅ **Route validation (ID parameters)**
- ✅ **Data sanitization**
- ✅ 404 handler for undefined routes

## 📂 Project Structure

```
glowup-backend/
├── controllers/
│   └── user.controller.js       # Request/Response logic
├── services/
│   └── user.service.js          # Business logic & data management
├── routes/
│   └── user.routes.js           # API endpoint definitions
├── middlewares/
│   ├── logger.js                # Request logging
│   ├── validateUser.js          # Input validation
│   └── errorHandler.js          # Global error handling
├── utils/
│   └── response.js              # Standardized response helper
├── app.js                       # Express app configuration
├── server.js                    # Server entry point
├── package.json
└── README.md
```

## 🛠️ Technologies

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JavaScript** - Programming language

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/bilgenurpala/glowup-backend.git
cd glowup-backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm run dev
```

The server will run at `http://localhost:3000`

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
    "createdAt": "2025-01-26T10:30:00.000Z",
    "updatedAt": "2025-01-26T10:30:00.000Z"
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

You can test the project using Postman or curl.

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

### Middleware Flow:
```
Request → Logger → Route → Validation → Controller → Service → Response
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
   - Calls appropriate service methods
   - Returns standardized responses

4. **Service Layer** (`services/`)
   - Contains business logic
   - Manages data operations
   - Independent of HTTP layer (reusable)

5. **Utils Layer** (`utils/`)
   - Helper functions
   - Response formatters

## 🔒 Error Handling

The application includes comprehensive error handling:

- **Global Error Handler**: Catches all errors and returns consistent format
- **404 Handler**: Returns proper response for undefined routes
- **Validation Errors**: Returns 400 status with descriptive messages
- **Not Found Errors**: Returns 404 status when resource doesn't exist
- **Try-Catch Blocks**: All controllers wrapped in try-catch

## 📊 Request Logging

Every request is automatically logged with:
- HTTP Method (GET, POST, PUT, DELETE)
- Request URL
- Response Status Code
- Response Time (in milliseconds)

Example log output:
```
GET /users -> 200 (5ms)
POST /users -> 201 (12ms)
PUT /users/1 -> 200 (8ms)
DELETE /users/999 -> 404 (3ms)
```

## 🎯 Development Roadmap

### Completed ✅
- [x] RESTful API design
- [x] Controller-Service pattern
- [x] Input validation middleware
- [x] Global error handling
- [x] Request logging
- [x] Standardized responses

### In Progress 🔄
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Authentication (JWT)
- [ ] Environment variables (.env)

### Planned 📋
- [ ] Advanced validation library (Joi/Zod)
- [ ] Unit tests (Jest)
- [ ] Integration tests
- [ ] API documentation (Swagger)
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Security headers (Helmet.js)
- [ ] Request rate limiting
- [ ] Pagination
- [ ] Filtering and sorting
- [ ] API versioning

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👤 Developer

**Bilgenur Pala**
- GitHub: [@bilgenurpala](https://github.com/bilgenurpala)
- LinkedIn: [@bilgenurpala](https://www.linkedin.com/in/bilgenur-pala-892a1a225/)

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you find this project helpful, please give it a star!
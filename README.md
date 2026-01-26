# 🌟 GlowUp Backend

A modern and professional REST API backend project built with Express.js.

## 🚀 Features

- ✅ RESTful API design
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Professional project structure (Controller-Service pattern)
- ✅ Standardized response format
- ✅ Request logging middleware
- ✅ Input validation
- ✅ Error handling

## 📂 Project Structure

```
glowup-backend/
├── controllers/          # Request/Response logic
├── services/            # Business logic
├── routes/              # API endpoints
├── middlewares/         # Custom middlewares
├── utils/               # Helper functions
├── app.js              # Express app configuration
├── server.js           # Server entry point
└── package.json
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

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users?limit=10` | Get first 10 users |
| POST | `/users` | Create a new user |
| PUT | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

### Example Requests

**Create User:**
```bash
POST /users
Content-Type: application/json

{
  "name": "Bilge"
}
```

**Response:**
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
  "name": "Bilgenur"
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
```

## 🎯 Development Roadmap

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Authentication (JWT)
- [ ] Input validation library (Joi/Zod)
- [ ] Unit tests (Jest)
- [ ] API documentation (Swagger)
- [ ] Rate limiting
- [ ] CORS configuration

## 👤 Developer

**Bilgenur Pala**
- GitHub: [@bilgenurpala](https://github.com/bilgenurpala)
- Linkedin: [@bilgenurpala](https://www.linkedin.com/in/bilgenur-pala-892a1a225/)

## 📄 License

This project is licensed under the MIT License.

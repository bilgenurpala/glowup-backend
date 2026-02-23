jest.mock('../../config/database');
jest.mock('../../middlewares/rateLimiter', () => ({
    apiLimiter: (req, res, next) => next(),
    authLimiter: (req, res, next) => next(),
}));

const request = require('supertest');
const app = require('../../app');
const pool = require('../../config/database');
const jwt = require('jsonwebtoken');

describe('Auth Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = 'test-secret';
        process.env.JWT_ACCESS_TOKEN_EXPIRES_IN = '15m';
        process.env.JWT_REFRESH_TOKEN_EXPIRES_IN = '7d';
    });

    describe('POST /auth/register', () => {
        it('should register a new user and return 201', async () => {
            const newUser = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };

            pool.query
                .mockResolvedValueOnce({ rows: [] })
                .mockResolvedValueOnce({ rows: [newUser] });

            const res = await request(app)
                .post('/auth/register')
                .send({ name: 'John Doe', email: 'john@example.com', password: 'Password1' });

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.email).toBe('john@example.com');
        });

        it('should return 409 when email is already taken', async () => {
            pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

            const res = await request(app)
                .post('/auth/register')
                .send({ name: 'John Doe', email: 'john@example.com', password: 'Password1' });

            expect(res.status).toBe(409);
            expect(res.body.success).toBe(false);
        });

        it('should return 400 when required fields are missing', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({ name: 'John Doe' });

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });

        it('should return 400 when password does not meet requirements', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({ name: 'John Doe', email: 'john@example.com', password: 'weak' });

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });

    describe('POST /auth/login', () => {
        it('should login and return tokens', async () => {
            const bcrypt = require('bcrypt');
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

            const mockUser = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                password: 'hashedpassword',
            };

            pool.query
                .mockResolvedValueOnce({ rows: [mockUser] })
                .mockResolvedValueOnce({ rows: [{ id: 1, token: 'refresh' }] });

            const res = await request(app)
                .post('/auth/login')
                .send({ email: 'john@example.com', password: 'Password1' });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.accessToken).toBeDefined();
            expect(res.body.data.refreshToken).toBeDefined();
        });

        it('should return 401 with invalid credentials', async () => {
            pool.query.mockResolvedValueOnce({ rows: [] });

            const res = await request(app)
                .post('/auth/login')
                .send({ email: 'wrong@example.com', password: 'Password1' });

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });

        it('should return 400 when email is missing', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({ password: 'Password1' });

            expect(res.status).toBe(400);
        });
    });

    describe('POST /auth/logout', () => {
        it('should logout and invalidate refresh token', async () => {
            pool.query.mockResolvedValueOnce({ rows: [{ id: 1, token: 'refresh-token' }] });

            const res = await request(app)
                .post('/auth/logout')
                .send({ refreshToken: 'refresh-token' });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should return 400 when refreshToken is missing', async () => {
            const res = await request(app)
                .post('/auth/logout')
                .send({});

            expect(res.status).toBe(400);
        });

        it('should return 404 when refreshToken is not found', async () => {
            pool.query.mockResolvedValueOnce({ rows: [] });

            const res = await request(app)
                .post('/auth/logout')
                .send({ refreshToken: 'nonexistent-token' });

            expect(res.status).toBe(404);
        });
    });

    describe('GET /auth/me', () => {
        it('should return user profile with valid token', async () => {
            const mockUser = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
            };

            const token = jwt.sign({ userId: 1, email: 'john@example.com' }, 'test-secret', { expiresIn: '15m' });
            pool.query.mockResolvedValueOnce({ rows: [mockUser] });

            const res = await request(app)
                .get('/auth/me')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.data.email).toBe('john@example.com');
        });

        it('should return 401 without token', async () => {
            const res = await request(app).get('/auth/me');
            expect(res.status).toBe(401);
        });
    });
});

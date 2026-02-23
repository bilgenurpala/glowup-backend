jest.mock('../../config/database');
jest.mock('../../middlewares/rateLimiter', () => ({
    apiLimiter: (req, res, next) => next(),
    authLimiter: (req, res, next) => next(),
}));

const request = require('supertest');
const app = require('../../app');
const pool = require('../../config/database');
const jwt = require('jsonwebtoken');

const getAuthToken = () => {
    process.env.JWT_SECRET = 'test-secret';
    return jwt.sign({ userId: 1, email: 'test@example.com' }, 'test-secret', { expiresIn: '15m' });
};

describe('User Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = 'test-secret';
    });

    describe('GET /users', () => {
        it('should return list of users', async () => {
            const mockUsers = [
                { id: 1, name: 'Alice', created_at: new Date().toISOString() },
                { id: 2, name: 'Bob', created_at: new Date().toISOString() },
            ];
            pool.query.mockResolvedValueOnce({ rows: mockUsers });

            const res = await request(app).get('/users');

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.users).toHaveLength(2);
        });

        it('should support pagination via page and limit query params', async () => {
            pool.query.mockResolvedValueOnce({ rows: [] });

            const res = await request(app).get('/users?page=2&limit=10');

            expect(res.status).toBe(200);
            expect(res.body.data.page).toBe(2);
            expect(res.body.data.limit).toBe(10);
        });

        it('should cap limit at 100', async () => {
            pool.query.mockResolvedValueOnce({ rows: [] });

            const res = await request(app).get('/users?limit=200');

            expect(res.status).toBe(200);
            expect(res.body.data.limit).toBe(100);
        });
    });

    describe('POST /users', () => {
        it('should create a new user and return 201', async () => {
            const mockUser = { id: 1, name: 'Alice', created_at: new Date().toISOString() };
            pool.query.mockResolvedValueOnce({ rows: [mockUser] });

            const res = await request(app)
                .post('/users')
                .send({ name: 'Alice' });

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.name).toBe('Alice');
        });

        it('should return 400 when name is missing', async () => {
            const res = await request(app)
                .post('/users')
                .send({});

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });

        it('should return 400 when name is too short', async () => {
            const res = await request(app)
                .post('/users')
                .send({ name: 'A' });

            expect(res.status).toBe(400);
        });
    });

    describe('PUT /users/:id', () => {
        it('should update user when authenticated', async () => {
            const mockUser = { id: 1, name: 'Updated', updated_at: new Date().toISOString() };
            pool.query.mockResolvedValueOnce({ rows: [mockUser] });

            const res = await request(app)
                .put('/users/1')
                .set('Authorization', `Bearer ${getAuthToken()}`)
                .send({ name: 'Updated' });

            expect(res.status).toBe(200);
            expect(res.body.data.name).toBe('Updated');
        });

        it('should return 401 without auth token', async () => {
            const res = await request(app)
                .put('/users/1')
                .send({ name: 'Updated' });

            expect(res.status).toBe(401);
        });

        it('should return 404 when user does not exist', async () => {
            pool.query.mockResolvedValueOnce({ rows: [] });

            const res = await request(app)
                .put('/users/999')
                .set('Authorization', `Bearer ${getAuthToken()}`)
                .send({ name: 'Updated' });

            expect(res.status).toBe(404);
        });

        it('should return 400 for invalid ID', async () => {
            const res = await request(app)
                .put('/users/abc')
                .set('Authorization', `Bearer ${getAuthToken()}`)
                .send({ name: 'Updated' });

            expect(res.status).toBe(400);
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete user when authenticated', async () => {
            const mockUser = { id: 1, name: 'Alice' };
            pool.query.mockResolvedValueOnce({ rows: [mockUser] });

            const res = await request(app)
                .delete('/users/1')
                .set('Authorization', `Bearer ${getAuthToken()}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should return 401 without auth token', async () => {
            const res = await request(app).delete('/users/1');
            expect(res.status).toBe(401);
        });

        it('should return 404 when user does not exist', async () => {
            pool.query.mockResolvedValueOnce({ rows: [] });

            const res = await request(app)
                .delete('/users/999')
                .set('Authorization', `Bearer ${getAuthToken()}`);

            expect(res.status).toBe(404);
        });
    });
});

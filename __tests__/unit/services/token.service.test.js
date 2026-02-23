const tokenService = require('../../../services/token.service');
const jwt = require('jsonwebtoken');
const pool = require('../../../config/database');

jest.mock('jsonwebtoken');
jest.mock('../../../config/database');

describe('Token Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = 'test-secret';
        process.env.JWT_ACCESS_TOKEN_EXPIRES_IN = '15m';
        process.env.JWT_REFRESH_TOKEN_EXPIRES_IN = '7d';
    });

    describe('generateAccessToken', () => {
        it('should generate access token with correct payload and expiry', () => {
            const mockToken = 'mock.access.token';
            jwt.sign.mockReturnValue(mockToken);

            const userId = 1;
            const email = 'test@example.com';
            const token = tokenService.generateAccessToken(userId, email);

            expect(jwt.sign).toHaveBeenCalledWith(
                { userId, email },
                'test-secret',
                { expiresIn: '15m' }
            );
            expect(token).toBe(mockToken);
        });
    });

    describe('generateRefreshToken', () => {
        it('should generate refresh token with correct payload and expiry', () => {
            const mockToken = 'mock.refresh.token';
            jwt.sign.mockReturnValue(mockToken);

            const userId = 1;
            const email = 'test@example.com';
            const token = tokenService.generateRefreshToken(userId, email);

            expect(jwt.sign).toHaveBeenCalledWith(
                { userId, email },
                'test-secret',
                { expiresIn: '7d' }
            );
            expect(token).toBe(mockToken);
        });
    });

    describe('verifyToken', () => {
        it('should verify valid token and return payload', () => {
            const mockPayload = {
                userId: 1,
                email: 'test@example.com'
            };
            jwt.verify.mockReturnValue(mockPayload);

            const token = 'valid.token.here';
            const result = tokenService.verifyToken(token);

            expect(jwt.verify).toHaveBeenCalledWith(token, 'test-secret');
            expect(result).toEqual(mockPayload);
        });

        it('should return null for invalid token', () => {
            jwt.verify.mockImplementation(() => {
                throw new Error('Invalid token');
            });

            const result = tokenService.verifyToken('invalid.token');
            expect(result).toBeNull();
        });

        it('should return null for expired token', () => {
            jwt.verify.mockImplementation(() => {
                throw new Error('Token expired');
            });

            const result = tokenService.verifyToken('expired.token');
            expect(result).toBeNull();
        });
    });

    describe('saveRefreshToken', () => {
        it('should insert token into database and return the record', async () => {
            const mockRecord = { id: 1, user_id: 1, token: 'refresh-token' };
            pool.query.mockResolvedValueOnce({ rows: [mockRecord] });

            const result = await tokenService.saveRefreshToken(1, 'refresh-token');

            expect(pool.query).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockRecord);
        });
    });

    describe('findRefreshToken', () => {
        it('should return token record when found', async () => {
            const mockRecord = { id: 1, token: 'refresh-token' };
            pool.query.mockResolvedValueOnce({ rows: [mockRecord] });

            const result = await tokenService.findRefreshToken('refresh-token');
            expect(result).toEqual(mockRecord);
        });

        it('should return null when token not found', async () => {
            pool.query.mockResolvedValueOnce({ rows: [] });

            const result = await tokenService.findRefreshToken('nonexistent');
            expect(result).toBeNull();
        });
    });

    describe('deleteRefreshToken', () => {
        it('should delete token and return deleted record', async () => {
            const mockRecord = { id: 1, token: 'refresh-token' };
            pool.query.mockResolvedValueOnce({ rows: [mockRecord] });

            const result = await tokenService.deleteRefreshToken('refresh-token');
            expect(result).toEqual(mockRecord);
        });

        it('should return null if token does not exist', async () => {
            pool.query.mockResolvedValueOnce({ rows: [] });

            const result = await tokenService.deleteRefreshToken('nonexistent');
            expect(result).toBeNull();
        });
    });

    describe('deleteExpiredTokens', () => {
        it('should delete expired tokens and return count', async () => {
            pool.query.mockResolvedValueOnce({ rowCount: 3 });

            const result = await tokenService.deleteExpiredTokens();
            expect(result).toBe(3);
        });
    });
});

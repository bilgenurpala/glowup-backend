const authService = require('../../../services/auth.service');
const bcrypt = require('bcrypt');
const pool = require('../../../config/database');
const tokenService = require('../../../services/token.service');

jest.mock('bcrypt');
jest.mock('../../../config/database');
jest.mock('../../../services/token.service');

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        created_at: new Date(),
        updated_at: new Date(),
      };

      pool.query
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [mockUser] });

      bcrypt.hash.mockResolvedValue('hashedpassword');

      const result = await authService.register('Test User', 'test@example.com', 'Password1');

      expect(pool.query).toHaveBeenCalledTimes(2);
      expect(bcrypt.hash).toHaveBeenCalledWith('Password1', 10);
      expect(result).toEqual(mockUser);
    });

    it('should throw error if user already exists', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

      await expect(
        authService.register('Test User', 'test@example.com', 'Password1')
      ).rejects.toThrow('User already exists');
    });
  });

  describe('login', () => {
    it('should return user and tokens on successful login', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        created_at: new Date(),
        updated_at: new Date(),
      };

      pool.query.mockResolvedValueOnce({ rows: [mockUser] });
      bcrypt.compare.mockResolvedValue(true);
      tokenService.generateAccessToken.mockReturnValue('access-token');
      tokenService.generateRefreshToken.mockReturnValue('refresh-token');
      tokenService.saveRefreshToken.mockResolvedValue({});

      const result = await authService.login('test@example.com', 'Password1');

      expect(result.accessToken).toBe('access-token');
      expect(result.refreshToken).toBe('refresh-token');
      expect(result.user.password).toBeUndefined();
    });

    it('should throw error if user not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      await expect(
        authService.login('notfound@example.com', 'Password1')
      ).rejects.toThrow('Invalid email or password');
    });

    it('should throw error if password is invalid', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
      };

      pool.query.mockResolvedValueOnce({ rows: [mockUser] });
      bcrypt.compare.mockResolvedValue(false);

      await expect(
        authService.login('test@example.com', 'WrongPassword1')
      ).rejects.toThrow('Invalid email or password');
    });
  });

  describe('getUserById', () => {
    it('should return user when found', async () => {
      const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
      pool.query.mockResolvedValueOnce({ rows: [mockUser] });

      const result = await authService.getUserById(1);
      expect(result).toEqual(mockUser);
    });

    it('should return null when user not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await authService.getUserById(999);
      expect(result).toBeNull();
    });
  });
});

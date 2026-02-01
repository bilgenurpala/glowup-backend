const { ok, fail } = require('../utils/response');
const authService = require('../services/auth.service');
const tokenService = require('../services/token.service');

const register = async (req, res, next) => {
    try {
        const { name , email, password } = req.body;
        const user = await authService.register(name, email, password);
        return ok(res, user, 'User registered successfully', 201);
    } catch (err) {
        if (err.message === 'User already exists') {
            return fail(res, err.message, 409);
        }
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        return ok(res, result, 'Login successful'); 
    } catch (err) {
        if (err.message === 'Invalid email or password') {
            return fail(res, err.message, 401);
        }
        next(err);
    }
}

const getMe = async (req, res, next) => {
    try {
        const user = await authService.getUserById(req.user.userId);

        if (!user) {
            return fail(res, 'User not found', 404);
        }
        return ok (res, user, 'User profile fetched successfully');
    } catch (err) {
        next(err);
    }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return fail(res, 'Refresh token is required', 400);
    }

    const decoded = tokenService.verifyToken(refreshToken);
    if (!decoded) {
      return fail(res, 'Invalid or expired refresh token', 401);
    }

    const storedToken = await tokenService.findRefreshToken(refreshToken);
    if (!storedToken) {
      return fail(res, 'Refresh token not found', 401);
    }

    if (new Date(storedToken.expires_at) < new Date()) {
      await tokenService.deleteRefreshToken(refreshToken);
      return fail(res, 'Refresh token has expired', 401);
    }

    const newAccessToken = tokenService.generateAccessToken(decoded.userId, decoded.email);

    const newRefreshToken = tokenService.generateRefreshToken(decoded.userId, decoded.email);
    
    await tokenService.deleteRefreshToken(refreshToken);
    
    await tokenService.saveRefreshToken(decoded.userId, newRefreshToken);

    return ok(res, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }, 'Tokens refreshed successfully');
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return fail(res, 'Refresh token is required', 400);
    }

    const deleted = await tokenService.deleteRefreshToken(refreshToken);
    if (!deleted) {
      return fail(res, 'Refresh token not found', 404);
    }
    return ok(res, null, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
    register,
    login,
    getMe,
    refreshToken,
    logout
};

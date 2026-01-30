const { ok, fail } = require('../utils/response');
const authService = require('../services/auth.service');

const register = async (req, res, next) => {
    try {
        const { name , email, password } = req.body;

        if (!name || !email || !password) {
            return fail(res, 'Name, email, and password are required', 400);
        }

        if (password.length <6) {
            return fail(res, 'Password must be at least 6 characters', 400);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return fail(res, 'Invalid email format', 400);
        }

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

        if (!email || !password) {
            return fail(res, 'Email and password are required', 400);
        }

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

module.exports = {
    register,
    login,
    getMe
};
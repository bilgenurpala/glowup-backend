const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const SALT_ROUNDS = 10;

const register = async (name, email, password) => {
    const checkQuery = 'SELECT * FROM users WHERE email = $1';
    const existingUser = await pool.query(checkQuery, [email]);

    if (existingUser.rows.length > 0) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const insertQuery = `
        INSERT INTO users (name, email, password, created_at, updated_at)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id, name, email, created_at, updated_at
    `;
    const result = await pool.query(insertQuery, [name, email, hashedPassword]);
    return result.rows[0];
};

const login = async (email, password) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
        throw new Error('Invalid email or password');
    }

    const user = result.rows[0];

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
        {userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d'}
    );

    const { password: _, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        token
    };
};

const getUserById = async (userId) => {
    const query = 'SELECT id, name, email, created_at, updated_at FROM users WHERE id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows[0] || null;
};

module.exports = {
    register,
    login,
    getUserById,
};
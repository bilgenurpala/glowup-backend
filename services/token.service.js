const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const generateAccessToken = (userId, email) => {
    return jwt.sign(
        { userId, email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '15m' }
    );
};

const generateRefreshToken = (userId, email) => {
    return jwt.sign(
        { userId, email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '7d' }
    );
};

const saveRefreshToken = async (userId, refreshToken) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const query = `
        INSERT INTO refresh_tokens (user_id, token, expires_at)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    
    const result = await pool.query(query, [userId, refreshToken, expiresAt]);
    return result.rows[0];
};

const findRefreshToken = async (token) => { 
    const query = 'SELECT * FROM refresh_tokens WHERE token = $1';
    const result = await pool.query(query, [token]);
    return result.rows[0] || null;
};

const deleteRefreshToken = async (token) => {
  const query = 'DELETE FROM refresh_tokens WHERE token = $1 RETURNING *';
  const result = await pool.query(query, [token]);
  return result.rows[0] || null;
};

const deleteAllUserRefreshTokens = async (userId) => {
  const query = 'DELETE FROM refresh_tokens WHERE user_id = $1';
  await pool.query(query, [userId]);
};

const deleteExpiredTokens = async () => {
    const query = 'DELETE FROM refresh_tokens WHERE expires_at < CURRENT_TIMESTAMP';
    const result = await pool.query(query);
    return result.rowCount;
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteAllUserRefreshTokens,
  deleteExpiredTokens,
  verifyToken,
};
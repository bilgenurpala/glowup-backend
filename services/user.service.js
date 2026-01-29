const pool = require('../config/database');

/**
 * Get all users with optional limit
 */
const getAllUsers = async (limit = 50) => {
  const query = 'SELECT * FROM users ORDER BY id LIMIT $1';
  const result = await pool.query(query, [limit]);
  return result.rows;
};

/**
 * Create a new user
 */
const createUser = async (name) => {
  const query = `
    INSERT INTO users (name, created_at, updated_at) 
    VALUES ($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
    RETURNING *
  `;
  const result = await pool.query(query, [name]);
  return result.rows[0];
};

/**
 * Update a user by ID
 */
const updateUser = async (id, name) => {
  const query = `
    UPDATE users 
    SET name = $1, updated_at = CURRENT_TIMESTAMP 
    WHERE id = $2 
    RETURNING *
  `;
  const result = await pool.query(query, [name, id]);
  return result.rows[0] || null;
};

/**
 * Delete a user by ID
 */
const deleteUser = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};

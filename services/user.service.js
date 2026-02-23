const pool = require('../config/database');

const getAllUsers = async (limit = 50, offset = 0) => {
  const query = 'SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2';
  const result = await pool.query(query, [limit, offset]);
  return result.rows;
};

const createUser = async (name) => {
  const query = `
    INSERT INTO users (name, created_at, updated_at)
    VALUES ($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING *
  `;
  const result = await pool.query(query, [name]);
  return result.rows[0];
};

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

const { ok, fail } = require("../utils/response");

let users = [];

const getUsers = (req, res) => {
  const limit = Number(req.query.limit) || 50;
  return ok(res, users.slice(0, limit), "Users retrieved successfully");
};

const createUser = (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return fail(res, "Name must be at least 2 characters", 400);
    }

    const newUser = 
    { id: users.length + 1, 
      name: name.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString() 
    };

    users.push(newUser);
    return ok(res, newUser, "User created successfully", 201);
};

const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if(!Number.isInteger(id) || id <= 0) {
    return fail(res, "Invalid user ID", 400);
  }

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return fail(res, "Name must be at least 2 characters", 400);
  }

  const idx = users.findIndex(user => user.id === id);
  if (idx === -1) {
    return fail(res, "User not found", 404);
  } else {
    users[idx].name = name.trim();
    users[idx].updatedAt = new Date().toISOString();
  }
    return ok(res, users[idx], "User updated successfully");
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return fail(res, "Invalid user ID", 400);
  }

  const idx = users.findIndex(user => user.id === id);
  if (idx === -1) {
    return fail(res, "User not found", 404);
  }

  const deleted = users.splice(idx, 1)[0];
  return ok(res, deleted, "User deleted successfully");
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};

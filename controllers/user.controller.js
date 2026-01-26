const { ok, fail } = require("../utils/response");
const userService = require("../services/user.service");

const getUsers = (req, res) => {
  const limit = Number(req.query.limit) || 50;
  const users = userService.getAllUsers(limit);
  return ok(res, users, "Users retrieved successfully");
};

const createUser = (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return fail(res, "Name must be at least 2 characters", 400);
    }

    const user = userService.createUser(name.trim());
    return ok(res, user, "User created", 201);
};

const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if(!Number.isInteger(id) || id <= 0) {
    return fail(res, "Invalid ID", 400);
  }

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return fail(res, "Name must be at least 2 characters", 400);
  }

  const updated = userService.updateUser(id, name.trim());
  if(!updated) return fail(res, "User not found", 404);

  return ok(res, updated, "User updated");
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return fail(res, "Invalid user ID", 400);
  }

  const deleted = userService.deleteUser(id);
  if(!deleted) return fail(res, "User not found", 404);

  return ok(res, deleted, "User deleted");
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};

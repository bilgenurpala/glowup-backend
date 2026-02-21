const { ok, fail } = require("../utils/response");
const userService = require("../services/user.service");

const getUsers = async (req, res, next) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const offset = (page - 1) * limit;
    const users = await userService.getAllUsers(limit, offset);
    return ok(res, { users, page, limit }, "Users retrieved successfully");
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await userService.createUser(name);
    return ok(res, user, "User created", 201);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.validatedId;
    const { name } = req.body;

    const updated = await userService.updateUser(id, name);
    if (!updated) {
      return fail(res, "User not found", 404);
    }

    return ok(res, updated, "User updated");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.validatedId;

    const deleted = await userService.deleteUser(id);
    if (!deleted) {
      return fail(res, "User not found", 404);
    }

    return ok(res, deleted, "User deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};

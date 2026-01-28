const { ok, fail } = require("../utils/response");
const userService = require("../services/user.service");

const getUsers = (req, res, next) => {
  try {
      const limit = Number(req.query.limit) || 50;
      const users = userService.getAllUsers(limit);
      return ok(res, users, "Users retrieved successfully");
      } catch (error) {
        next(error);
      }
};

const createUser = (req, res, next) => {
    try {
      const { name } = req.body;
      const user = userService.createUser(name);
      return ok(res, user, "User created", 201);
    } catch (error) {
      next(error);
    }
};

const updateUser = (req, res) => {
  try{
    const id = req.validatedId;
    const { name } = req.body;

    const updated = userService.updateUser(id, name);
    if(!updated) {
      return fail(res, "User not found", 404);
    }
    return ok(res, updated, "User updated");
  } catch (error) {
    next(error);
  }
};

const deleteUser = (req, res) => { 
  try {
    const id = req.validatedId;
    const deleted = userService.deleteUser(id);
    if(!deleted) {
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

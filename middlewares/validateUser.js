const { fail } = require("../utils/response");
const validateUserCreate = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return fail(res, "Name is required", 400);
  }

  if (typeof name !== "string") {
    return fail(res, "Name must be a string", 400);
  }

  if (name.trim().length < 2) {
    return fail(res, "Name must be at least 2 characters", 400);
  }

  if (name.trim().length > 50) {
    return fail(res, "Name must not exceed 50 characters", 400);
  }

  req.body.name = name.trim();

  next(); 
};

const validateUserId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return fail(res, "Invalid user ID", 400);
  }

  req.validatedId = id;

  next();
};

module.exports = {
  validateUserCreate,
  validateUserId,
};
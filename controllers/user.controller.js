let users = [];

const getUsers = (req, res) => {
  res.json({
    message: "Users retrieved successfully",
    data: users.length > 0 ? users : [{ id: 1, name: "Bilge"}]
  });
};

const createUser = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    res.status(201).json({
        message: "User created successfully",
        data: newUser
    });
};
module.exports = {
  getUsers,
  createUser
};
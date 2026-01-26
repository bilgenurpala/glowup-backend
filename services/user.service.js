let users = [];

const getAllUsers = (limit = 50) => {
  return users.slice(0, limit);
};

const createUser = (name) => {
    const newUser = {
        id : users.length + 1,
        name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    users.push(newUser);
    return newUser;
};

const updateUser = (id, name) => {
    const index = users.findIndex(u => u.id === id);
    if(index === -1) return null;

    users[index].name = name;
    users[index].updatedAt = new Date().toISOString();
    return users[index];
};

const deleteUser = (id) => {
    const index = users.findIndex(u => u.id === id);
    if(index === -1) return null;

    return users.splice(index, 1)[0];
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};
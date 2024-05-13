const users = []; // Array to hold user data

const User = function (id, name, email, password, role) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.role = role;
};

User.prototype.toJSON = function () {
  return {
    id: this.id,
    name: this.name,
    email: this.email,
    role: this.role
  };
};

// Methods to manage the user array
const addUser = (user) => {
  if (!user instanceof User) {
    throw new Error("Invalid user object provided");
  }
  users.push(user);
};

const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

const getAllUsers = () => {
  return users.slice(); // Return a copy to avoid mutation
};

const getUserWithEmail = (email) => {
  return users.find((user) => user.email === email);
};

module.exports = {
  User,
  addUser,
  getUserById,
  getAllUsers,
  getUserWithEmail,
};

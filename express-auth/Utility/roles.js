const roles = {
  SuperAdmin: ["SuperAdmin", "Admin", "User"],
  Admin: ["Admin", "User"],
  User: ["User"],
};

const authorize = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.userRole; // Get role from request object
    if (!allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }
    next();
  };
};

module.exports = {
  roles,
  authorize,
};

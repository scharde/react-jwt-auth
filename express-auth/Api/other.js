const express = require("express");
const { roles, authorize } = require("../Utility/roles");

const router = express.Router();

// Superadmin API route (access for SuperAdmin only)
router.get("/superadmin", authorize(roles.SuperAdmin), (req, res) => {
  res.json({ message: "Superadmin access granted" });
});

// Admin API route (access for Admin and SuperAdmin)
router.get("/admin", authorize(roles.Admin), (req, res) => {
  res.json({ message: "Admin access granted" });
});

// User API route (access for all roles)
router.get("/user", (req, res) => {
  res.json({ message: "User access granted" });
});

module.exports = router;

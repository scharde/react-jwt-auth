const express = require("express");
const userModule = require("./user.model");
const { roles, authorize } = require("../Utility/roles");

const router = express.Router();

router.get("/:id", authorize(roles.User), async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userModule.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  register,
  login,
} = require("../controllers/authController");

const {auth, isAdmin, isUser} = require("../middleware/auth")

router.post("/register", register);
router.post("/login", login);

module.exports = router;

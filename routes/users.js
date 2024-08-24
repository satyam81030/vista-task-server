const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersControllers");
const authMiddleware = require("../middleware/auth")

router.post("/user-meta", authMiddleware.auth, authMiddleware.isUser, userController.addOrUpdateUserMeta);
router.post("/admin/user-meta/:id", authMiddleware.auth, authMiddleware.isUser, userController.addOrUpdateUserMetaById);
router.get("/users",  authMiddleware.auth, authMiddleware.isAdmin, userController.getAllUsers);
router.post("/users",authMiddleware.auth, authMiddleware.isAdmin, userController.addUser)
router.get("/users/:id", userController.getUserMetaByUserId); // New route to get user details by ID


module.exports = router;

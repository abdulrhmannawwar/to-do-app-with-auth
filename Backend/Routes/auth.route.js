const router = require("express").Router();
const {
    register,
    login,
    logOut,
    me,
} = require("../Controllers/auth.controller");
const validateEmail = require("../Middleware/validateEmail.middleware");
const validatePassword = require("../Middleware/validatePassword.middleware");
const authMiddleware = require("../Middleware/auth.middleware");

router.post("/register", validateEmail, validatePassword, register);
router.post("/login", validateEmail, validatePassword, login);
router.post("/logout", logOut);
router.get("/me", authMiddleware, me);
module.exports = router;

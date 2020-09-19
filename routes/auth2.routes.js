const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require('../controllers/auth2.controller');
const { authenticate } = require('../middleware/index')

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", authenticate, async (req, res) => {
    return res.send(req.user)
});

router.get("/logout", authenticate, authController.logout);

module.exports = router;
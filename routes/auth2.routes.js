const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require('../controllers/auth2.controller');
const { authenticate } = require('../middleware/index')

router.post("/register", authController.register);
router.post("/login", authController.login);
app.get('/auth/outlook',
  passport.authenticate('windowslive', {
    scope: [
      'openid',
      'profile',
      'offline_access',
      'https://outlook.office.com/Mail.Read'
    ]
  })
);

app.get('/auth/outlook/callback',
  passport.authenticate('windowslive', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
router.get("/user", authenticate, async (req, res) => {
    return res.send(req.user)
});

router.get("/logout", authenticate, authController.logout);

module.exports = router;

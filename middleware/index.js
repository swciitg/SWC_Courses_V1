const jwt = require("jsonwebtoken");

///////////////// AUTH MIDDLEWARES

/// FOR JWT
function authenticate(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.ennv.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ msg: "Invalid token" });
  }
}

/// FOR PASSPORT-JS
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "You are not authenticated !" });
  }
};

module.exports = { authenticate, isLoggedIn };

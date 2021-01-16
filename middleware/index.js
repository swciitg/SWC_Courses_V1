const config = require("config");
const jwt = require("jsonwebtoken");

///////////////// AUTH MIDDLEWARES

/// FOR JWT
function authenticate(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
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

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ msg: "Only admin has access to this route" });
  }
};

module.exports = { authenticate, isLoggedIn, isAdmin };

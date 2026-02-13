const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    req.user = decoded;
  } catch (err) {
    req.user = null;
  } finally {
    next();
  }
}

module.exports = { authMiddleware };

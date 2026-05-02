const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded; // contains user.id
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
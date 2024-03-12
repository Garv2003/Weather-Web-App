const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

module.exports = function (req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
  }
  try {
    const verified = jwt.verify(token, "secret");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

module.exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      res.status(400).json({ error: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await client.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, hashedPassword]
      );
      res.json({ message: "User created" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      res.status(400).json({ error: "User does not exist" });
    } else {
      const valid = await bcrypt.compare(password, user.rows[0].password);
      if (valid) {
        const token = jwt.sign({ email: user.rows[0].email }, "secret");
        res.cookie("token", token, {
          httpOnly: true,
        });
        res.json({ message: "Logged in" });
      } else {
        res.status(400).json({ error: "Invalid password" });
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.user = async (req, res) => {
  try {
    const user = await client.query(
      "SELECT email FROM users WHERE email = $1",
      [req.user.email]
    );
    res.json(user.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

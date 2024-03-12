module.exports.addPlace = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await client.query("SELECT * FROM places WHERE name = $1", [
      name,
    ]);
    if (user.rows.length > 0) {
      res.status(400).json({ error: "Place already exists" });
    } else {
      await client.query("INSERT INTO places (name) VALUES ($1)", [name]);
      res.json({ message: "Place added" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.deletePlace = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await client.query("SELECT * FROM places WHERE name = $1", [
      name,
    ]);
    if (user.rows.length === 0) {
      res.status(400).json({ error: "Place does not exist" });
    } else {
      await client.query("DELETE FROM places WHERE name = $1", [name]);
      res.json({ message: "Place deleted" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

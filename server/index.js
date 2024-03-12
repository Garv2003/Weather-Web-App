const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const dotenv = require("dotenv");
const { Client } = require("pg");

dotenv.config();
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(helmet());

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/user"));

// Database Connection

const client = new Client({
  connectionString: process.env.POSTGRES_URL,
});

const port = process.env.PORT || 8000;

client
  .connect()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("connection error", err.stack));

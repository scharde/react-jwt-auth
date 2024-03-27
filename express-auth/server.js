const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 3000;
const secretKey = "yourSecretKey"; // Change this to a strong and secure key in a real-world scenario

app.use(bodyParser.json());
app.use(cors());

const users = [];

// API to create a new user
app.post("/api/register", (req, res) => {
  const { username, password, name, email } = req.body;

  // Basic validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Check if the username is already taken
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "Username is already taken." });
  }

  // Create a new user
  const newUser = { username, password, name, email };
  users.push(newUser);

  res.status(201).json({ message: "User created successfully." });
});

// API to login and generate a JWT token
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Find the user in the array
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  // Check if the user exists
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  // Generate JWT token
  const token = jwt.sign(
    { username: user.username, name: user.name },
    secretKey,
    {
      expiresIn: "1h",
    }
  );

  res.json({ token, data: { name: user.name, email: user.email } });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

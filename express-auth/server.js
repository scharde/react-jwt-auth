const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require('./User/users'); 
const tokenService = require('./Utility/tokenService'); 
const utility = require('./Utility/index'); 
const userModule = require('./User/user.model'); 

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api/users', tokenService.verifyToken, userRouter); 

app.post("/api/register", (req, res) => {
  const { password, name, email } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email and password are required." });
  }

  if (userModule.getUserWithEmail(email)) {
    return res.status(400).json({ message: "email is already taken." });
  }

  const user1 = new userModule.User(utility.generateRandomId(8), name, email, password);
  userModule.addUser(user1);

  res.status(201).json({ message: "User created successfully." });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = userModule.getAllUsers().find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = tokenService.generateToken(user);
  res.json({ token, data: { id: user.id, email: user.email } });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
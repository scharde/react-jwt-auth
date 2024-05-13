const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./Api/auth");
const userRouter = require("./Api/users");
const otherRouter = require("./Api/other");
const { verifyToken } = require("./Utility/tokenService");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/", authRouter);
app.use("/api/", verifyToken, otherRouter);
app.use("/api/users", verifyToken, userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

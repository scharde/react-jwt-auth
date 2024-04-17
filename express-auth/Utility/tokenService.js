const jwt = require("jsonwebtoken");

const secretKey = "yourSecretKey"; 

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Access token is missing" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.id = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
};

const generateToken = (user) => {
  const token = jwt.sign({ email: user.email, id: user.id }, secretKey, {
    expiresIn: "1h",
  });

  return token;
};

module.exports = { verifyToken, generateToken };

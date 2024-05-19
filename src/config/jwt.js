const jwt = require("jsonwebtoken");

const jwtSecret = "mipasswordsecreto1";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: `Token no proporcionado` });
  }
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: `Token invalido` });
    }
    req.user = decoded;
    next();
  });
};

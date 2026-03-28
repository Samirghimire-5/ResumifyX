const jwt = require("jsonwebtoken");

const protectedRoute = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  
  const bearerToken = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;
  const token = bearerToken || req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: "Not authorized" });

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decode.type !== "access") {
      return res.status(401).json({ error: "Invalid token type" });
    }
    req.user = decode;
    next();
  } catch (err) {
    res.status(498).json({ error: "Token expired. Please log in again" });
  }
};

module.exports = protectedRoute;

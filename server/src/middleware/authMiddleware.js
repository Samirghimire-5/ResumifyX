const jwt = require("jsonwebtoken");

const protecteRoute = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  }catch (err) {
    res.status(401).json({message: 'Token is invalid'})
  }
};

module.exports = protecteRoute;
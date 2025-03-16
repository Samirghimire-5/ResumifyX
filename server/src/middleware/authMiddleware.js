const jwt = require("jsonwebtoken");

const protecteRoute = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not authorized" });

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  }catch (err) {
    res.status(498).json({error: 'Token is invalid'})
  }
};

module.exports = protecteRoute;
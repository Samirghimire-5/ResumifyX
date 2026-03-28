const { admin } = require("../auth/admin");

const authenticateUser = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Firebase ID token is required" });
    }

    // verify firebase jwt
    const decodeToken = await admin.auth().verifyIdToken(token);
    if (!decodeToken || !decodeToken.uid) {
      throw new Error("Invalid Firebase token");
    }

    req.firebase = decodeToken;
    next();
  } catch (error) {
    console.error("error when authenticating user", error);
    res.status(401).json({ error: "Invalid or expired Firebase token" });
  }
};

module.exports = { authenticateUser };

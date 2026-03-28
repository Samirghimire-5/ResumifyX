const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

const signAccessToken = (userId) =>
  jwt.sign({ id: userId, type: "access" }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

const signRefreshToken = (userId) =>
  jwt.sign({ id: userId, type: "refresh" }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

const setRefreshCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
};

const getUsers = async (req, res) => {
  const data = await User.find();
  return res.json(data);
};

const loginUser = async (req, res) => {
  try {
    const firebaseClaims = req.firebase;

    if (!firebaseClaims) {
      return res.status(401).json({ error: "Firebase verification missing" });
    }

    console.log("Firebase claims:", firebaseClaims);

    const firebaseId = firebaseClaims.uid;
    const email = firebaseClaims.email;

    if (!firebaseId || !email) {
      return res.status(401).json({ error: "Invalid Firebase claims" });
    }

    const fullName = (firebaseClaims.name || "").trim();
    const [firstNameFromClaims, ...lastNameParts] = fullName.split(" ");
    const firstName = firstNameFromClaims || "User";
    const lastName = lastNameParts.join(" ") || "-";
    const avatar = firebaseClaims.picture || "";
    const provider = "google";

    let user = await User.findOne({ firebaseId });

    if (!user) {
      user = await User.create({
        firebaseId,
        firstName,
        lastName,
        email,
        avatar,
        provider,
      });
    } else {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.avatar = avatar;
      user.provider = provider;
    }

    const accessToken = signAccessToken(user._id.toString());
    const refreshToken = signRefreshToken(user._id.toString());
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    user.refreshTokenHash = refreshTokenHash;
    await user.save();

    setRefreshCookie(res, refreshToken);

    return res.status(200).json({
      message: "Login successful",
      accessToken,
    });
  } catch (err) {
    console.log("Login failed", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token not found" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (decoded.type !== "refresh") {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    const user = await User.findById(decoded.id);
    if (!user || !user.refreshTokenHash) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    const newAccessToken = signAccessToken(user._id.toString());
    const newRefreshToken = signRefreshToken(user._id.toString());
    user.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
    await user.save();

    setRefreshCookie(res, newRefreshToken);

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(401).json({ error: "Refresh token expired or invalid" });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
        );
        await User.findByIdAndUpdate(decoded.id, { refreshTokenHash: null });
      } catch (e) {
        // Ignore invalid refresh token and still clear cookie.
      }
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    });
    res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to logout" });
  }
};

module.exports = { getUsers, loginUser, refreshAccessToken, logout };

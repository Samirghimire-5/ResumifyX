const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firebaseId: { type: String, required: true, unique: true }, // unique auto creates index behind the scenes
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    provider: { type: String },
    refreshTokenHash: { type: String, select: false },
  },
  { timestamps: true },
);

const User = mongoose.model("user", UserSchema);

module.exports = User;

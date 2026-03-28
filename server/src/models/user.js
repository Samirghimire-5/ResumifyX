const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firebaseId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    provider: { type: String },
  },
  { timestamps: true },
);

// index for faster query
UserSchema.index({ firebaseId: 1 });
UserSchema.index({ email: 1 });

const User = mongoose.model("user", UserSchema);

module.exports = User;

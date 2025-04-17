const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    previewImage: { type: String, required: true },
    description: { type: String },
    isDefault: { type: Boolean, default: false }, // if user didn't select any templet 
    isPremium: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);
module.exports = Template;

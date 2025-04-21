const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    previewImage: { type: String, required: true },
    description: { type: String },
    templateContent: { type: String, required: true },
    isDefault: { type: Boolean, default: false }, 
    isPremium: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);
module.exports = Template;

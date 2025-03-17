import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    previewImage: { type: String, required: true },
    description: { type: String },
    fieldsStructure: { type: Object, required: true }, // which fields are needed in the template
    isDefault: { type: Boolean, default: false }, // if user didn't select any templet 
    isPremium: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);
export default Template;

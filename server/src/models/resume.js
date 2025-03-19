import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    personalInfo: {
      image: {type: String},
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      jobTitle: {type: String, required: true},
      address: { type: String },
    },
    summary: { type: String },

    experience: [
      {
        jobTitle: { type: String, required: true },
        company: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String },
      },
    ],

    education: [
      {
        school: { type: String, required: true },
        degree: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
      },
    ],

    skills: [{ type: String }],

    achievements: [
      {
        title: { type: String },
        description: { type: String },
      },
    ],

    selectedTemplate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
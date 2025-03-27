const mongoose = require('mongoose')

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
      phone: { type: String },
      jobTitle: {type: String },
      address: { type: String },
    },
    summary: { type: String },

    experience: [
      {
        role: { type: String, required: true },
        company: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
      },
    ],

    education: [
      {
        school: { type: String, required: true },
        degree: { type: String, required: true },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],

    skills: [{ type: String }],

    selectedTemplate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
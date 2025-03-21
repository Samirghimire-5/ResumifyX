const Resume = require("../models/resume");

const getResume = async (req, res) => {
  const data = await Resume.find();
  return res.json(data);
};

const createNewResume = async (req, res) => {
  const resume = await Resume.create(req.body);
  res.json({ message: "created new resuem" });
  console.log(resume);
};


const updateResume = async (req, res) => {
  const resume = await Resume.findByIdAndUpdate(req.params.id, req.body)
  res.json({message: "updated successfully"})
};

const deletResume = async (req, res) => {
  await Resume.findByIdAndDelete(req.params.id)
  res.json({message: "deleted "})
};

module.exports = { getResume, createNewResume, updateResume, deletResume };

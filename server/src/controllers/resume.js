const Resume = require("../models/resume");

const getResumes = async (req, res) => {
  const data = await Resume.find();
  return res.json(data);
};

const getResume = async (req, res) => {
  const data = await Resume.findById(req.params.id)
  return res.json(data)
}

const createNewResume = async (req, res) => {
  try {
    const resume = await Resume.create(req.body);

    if (!resume) {
      return res.status(400).json({ error: 'Failed to save resume' });
    }

    res.status(200).json({
      message: "Successfully saved resume",
      resume,
    });
  } catch (error) {
    console.error("Error creating resume:", error.message);
    res.status(500).json({ error: 'Server error' });
  }
};


const updateResume = async (req, res) => {
  await Resume.findByIdAndUpdate(req.params.id, req.body)
  res.json({message: "updated successfully"})
};

const deleteResume = async (req, res) => {
  await Resume.findByIdAndDelete(req.params.id)
  res.json({message: "deleted "})
};

module.exports = { getResumes, getResume, createNewResume, updateResume, deleteResume }

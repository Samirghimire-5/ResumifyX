const Template = require("../models/template");

const getTemplates = async (req, res) => {
  try {
    const response = await Template.find();
    res.status(201).json({ message: "Created new template", response });
  } catch (error) {
    console.error("Error creating template:", error);
    res.status(500).json({ message: "Failed to create template", error: error.message });
  }
};

const getTemplate = async (req, res) => {
  try {
    const response = await Template.findById(req.params.id)
    res.status(201).json({ message: "Created new template", response });
  } catch (error) {
    console.error("Error creating template:", error);
    res.status(500).json({ message: "Failed to create template", error: error.message });
  }
}

const addNewTemplate = async (req, res) => {
  try {
    const previewImage = await req.file?.filename
    const template = await Template.create({...req.body, previewImage});
    res.status(201).json({ message: "Created new template", template });
  } catch (error) {
    console.error("Error creating template:", error);
    res.status(500).json({ message: "Failed to create template", error: error.message });
  }
};


const deleteTemplate = async (req, res) => {
  await Template.findByIdAndDelete(req.params.id)
  return res.json({message: "deleted"})
};

module.exports = { getTemplates, getTemplate, addNewTemplate, deleteTemplate };

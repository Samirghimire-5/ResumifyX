const Template = require("../models/template");

const getTemplates = async (req, res) => {
  const data = await Template.find();
  return res.json(data);
};

const getTemplate = async (req, res) => {
  const data = await Template.findById(req.params.id)
  return res.json(data)
}

const addNewTemplate = async (req, res) => {
  const template = await Template.create(req.body);
  res.json({ message: "created new template", template: template });
};


const deleteTemplate = async (req, res) => {
  await Template.findByIdAndDelete(req.params.id)
  return res.json({message: "deleted"})
};

module.exports = { getTemplates, getTemplate, addNewTemplate, deleteTemplate };

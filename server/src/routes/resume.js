const { Router } = require("express");
const upload = require('../middleware/imageMiddleware')
const { getResumes, getResume, createNewResume, updateResume, deleteResume } = require("../controllers/resume");
const app = Router();

// app.get("/api/resume", getResumes)
app.get("/api/resume/:id", getResume)
app.post("/api/resume", upload.single('image'), createNewResume)
app.put("/api/resume/:id", updateResume)
app.delete("/api/resume/:id", deleteResume)

module.exports = app;
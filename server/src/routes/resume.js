const { Router } = require("express");
const { getResume, createNewResume, updateResume, deletResume } = require("../controllers/resume");
const app = Router();

app.get("/api/resume", getResume)
app.get("/api/resume/:id", getResume)
app.post("/api/resume", createNewResume)
app.put("/api/resume/:id", updateResume)
app.delete("/api/resume/:id", deletResume)

module.exports = app;
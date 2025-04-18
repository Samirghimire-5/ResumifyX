const Router = require("express");
const { generateWithAi, geminiForEditor } = require("../controllers/gemini");
const app = Router();

app.post("/api/generate", generateWithAi)
app.post("/api/geminiEditor", geminiForEditor)

module.exports = app;
const Router = require("express");
const { generateWithAi } = require("../controllers/gemini");
const app = Router();

app.post("/api/generate", generateWithAi)

module.exports = app;
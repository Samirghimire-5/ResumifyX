const Router = require("express");
const controller = require("./controller");
const protectedRoute = require("../../middleware/verifyToken");
const app = Router();

app.post("/api/generate", protectedRoute, controller.generateWithAi)
app.post("/api/geminiEditor", protectedRoute, controller.geminiForEditor)

module.exports = app;
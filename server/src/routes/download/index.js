const Router = require("express");
const controller = require("./controller");
const protectedRoute = require("../../middleware/verifyToken");
const app = Router()

app.post("/api/download", protectedRoute, controller.download)

module.exports = app;
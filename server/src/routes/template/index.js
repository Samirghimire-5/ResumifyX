const { Router } = require("express");
const controller = require("./controller");
const upload = require("../../middleware/multer");
const protectedRoute = require("../../middleware/verifyToken");
const app = Router();

app.get("/api/templates", protectedRoute, controller.getTemplates);
app.get("/api/templates/:id", protectedRoute, controller.getTemplate);
app.post(
  "/api/templates",
  protectedRoute,
  upload.single("previewImage"),
  controller.addNewTemplate,
);
app.delete("/api/templates/:id", protectedRoute, controller.deleteTemplate);

module.exports = app;

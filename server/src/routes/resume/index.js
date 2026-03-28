const { Router } = require("express");
const upload = require("../../middleware/multer");
const controller = require("./controller");
const protectedRoute = require("../../middleware/verifyToken");
const app = Router();

// app.get("/api/resume", controller.getResumes)
app.get("/api/resume/:id", protectedRoute, controller.getResume);
app.post(
  "/api/resume",
  protectedRoute,
  upload.single("image"),
  controller.createNewResume,
);
app.put("/api/resume/:id", protectedRoute, controller.updateResume);
app.delete("/api/resume/:id", protectedRoute, controller.deleteResume);

module.exports = app;

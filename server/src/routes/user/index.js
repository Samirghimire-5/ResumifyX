const { Router } = require("express");
const controller = require("./controller")
const { authenticateUser } = require("../../middleware/authentication");
const protectedRoute = require("../../middleware/verifyToken");
const app = Router();

app.get("/", protectedRoute, controller.getUsers);
app.post("/auth", authenticateUser, controller.loginUser);
app.post("/refresh", controller.refreshAccessToken);
app.post("/logout", controller.logout);

module.exports = app;

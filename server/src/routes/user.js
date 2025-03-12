const { Router } = require("express");
const { getUsers, registerNewUsers, loginUser, dashboard } = require("../controllers/user");
const protecteRoute = require("../middleware/authMiddleware");
const app = Router();

app.get("/users", getUsers)
app.post("/api/register", registerNewUsers)
app.post("/api/login", loginUser)
app.get("/api/dashboard", protecteRoute, dashboard)

module.exports = app;
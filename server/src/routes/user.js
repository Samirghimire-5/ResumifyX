const { Router } = require("express");
const { getUsers, registerNewUsers, loginUser, dashboard, logout,  } = require("../controllers/user");
const protecteRoute = require("../middleware/authMiddleware");
const app = Router();

app.get("/api/users", getUsers)
app.post("/api/register", registerNewUsers)
app.post("/api/login", loginUser)
app.get("/api/dashboard", protecteRoute, dashboard)
app.post("/api/logout", logout)

module.exports = app;
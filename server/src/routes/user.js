const { Router } = require("express");
const { getUsers, registerNewUsers, loginUser, logout,  } = require("../controllers/user");
const protectedRoute = require("../middleware/authMiddleware");
const app = Router();

app.get("/api/users",protectedRoute, getUsers)
app.post("/api/register", registerNewUsers)
app.post("/api/login", loginUser)
app.post("/api/logout", logout)

module.exports = app;
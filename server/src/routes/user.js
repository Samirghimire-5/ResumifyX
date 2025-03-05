const { Router } = require("express");
const { getUsers, registerNewUsers } = require("../controllers/user");
const app = Router();

app.get("/users", getUsers)
app.post("/register", registerNewUsers)

module.exports = app;
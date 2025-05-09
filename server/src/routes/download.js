const { Router } = require("express");
const app = Router()

app.post("/api/download", downloadResume)

module.exports = app;
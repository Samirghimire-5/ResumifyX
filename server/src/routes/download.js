const Router = require("express");
const app = Router()
const {download} = require("../controllers/download")

app.post("/api/download", download)

module.exports = app;
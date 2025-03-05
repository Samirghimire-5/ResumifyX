const express = require("express")
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
const port = 5000;
app.use(cors());

// connection
mongoose.connect("mongodb://127.0.0.1:27017")
// schema
const userSchema = new mongoose.Schema({

})
// model
const User = mongoose.model("user", userSchema)

// router
app.get("/", (req, res) => {
  return res.json();
})

app.listen(port, () => console.log(`starting localhost: ${port}`))
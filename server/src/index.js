const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// Database Connection
const dbConnect = require("./db/connection");

// Middleware
const upload = require("./middleware/imageMiddleware");

// Routes
const userRoute = require("./routes/user");
const resumeRoute = require("./routes/resume");
const templateRoute = require('./routes/template')
const geminiRoute = require("./routes/gemini")

const app = express();

// Middleware Application
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow cookies, authentication headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Image Upload Route
app.post("/resumeImg", upload.single("image"), (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    res.status(200).json({ msg: "ayo hai" });
  } catch (error) {
    console.log("error", error);
  }
});

// Database Connection Initialization
dbConnect();

// Route Application
app.use(userRoute);
app.use(resumeRoute);
app.use(templateRoute);
app.use(geminiRoute)

// Server Start
app.listen(process.env.PORT, () => console.log(`starting localhost: ${process.env.PORT}`));
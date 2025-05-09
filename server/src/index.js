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
const downloadRoute = require("./routes/download")

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

// Database Connection Initialization
dbConnect();

// Route Application
app.use(userRoute);
app.use(resumeRoute);
app.use(templateRoute);
app.use(geminiRoute)
app.use(downloadRoute)
app.use('/uploads', express.static('uploads'));

// Server Start
app.listen(process.env.PORT, () => console.log(`starting localhost: ${process.env.PORT}`));
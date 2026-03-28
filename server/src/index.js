const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// Database Connection
const dbConnect = require("./db/connection");

// Middleware
const upload = require("./middleware/multer");

// Routes
const userRoute = require("./routes/user/index");
const resumeRoute = require("./routes/resume/index");
const templateRoute = require("./routes/template/index");
const geminiRoute = require("./routes/gemini/index");
const downloadRoute = require("./routes/download/index");

const app = express();

// Middleware Application
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow cookies, authentication headers
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database Connection Initialization
dbConnect();

app.use("/uploads", express.static("uploads"));

// Route Application
app.use("/api/user", userRoute);
app.use("/api/resume", resumeRoute);
app.use("/api/template", templateRoute);
app.use("/api/gemini", geminiRoute);
app.use("/api/download", downloadRoute);

// Server Start
app.listen(process.env.PORT, () =>
  console.log(`starting localhost: ${process.env.PORT}`),
);

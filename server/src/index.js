const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
const userRoute = require("./routes/user");
const dbConnect = require("./db/connection");
const cors = require("cors");
const port = 8000;
app.use(cookieParser()); // Allow reading cookies
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests only from frontend
    credentials: true, // Allow cookies, authentication headers
  })
);
app.use(express.json());

dbConnect();
app.use(userRoute);

app.listen(port, () => console.log(`starting localhost: ${port}`));

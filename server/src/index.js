const express = require("express")
const app = express();
const cors = require("cors");
const port = 8000;
const userRoute = require('./routes/user');
const dbConnect = require("./db/connection");
app.use(cors());
app.use(express.json());

dbConnect();
app.use(userRoute)

app.listen(port, () => console.log(`starting localhost: ${port}`))

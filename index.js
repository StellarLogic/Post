const express = require("express");
require("dotenv").config();
require("./config/dbConnection")();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// middleware
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
app.use("/api/v1/", require("./routes/index"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listing to PORT  : ${PORT}`));
const express = require("express");
require("dotenv").config();
require("./config/dbConnection")();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");

// middleware
const app = express();
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

// routes
app.use("/api/v1/", require("./routes/index"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listing to PORT  : ${PORT}`));

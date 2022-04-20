require("dotenv").config();
// const config = require("./config/config"); //.prepDb();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const express = require("express");
const { errorHandler } = require("./middlewares/auth");

const app = express();
app.use(cors());


// BODY PARSING
// app.use(express.json());
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);




app.use("/api/participants", require("./routes/participant"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
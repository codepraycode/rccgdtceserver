require("dotenv").config();
// const config = require("./config/config"); //.prepDb();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");
// add this line below the other import statements
const helmet = require('helmet');
const compression = require('compression');

const express = require("express");
const { errorHandler } = require("./middlewares/auth");



process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
    console.log(err.message, err.name);
    process.exit(1);
});




const app = express();


app.use(helmet());
app.use(compression()); //Compress all routes

// BODY PARSING
app.use(express.json());
// app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


app.use(cors());
app.use(errorHandler);


app.use("/api/participant", require("./routes/participant"));
app.use("/api/region", require("./routes/region"));
app.use("/api/province", require("./routes/province"));
app.use("/api/uploads", require("./routes/uploads"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
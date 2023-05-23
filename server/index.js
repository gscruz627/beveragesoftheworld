// Core Imports
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes.js";

// App uses import
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

//Core Configuration
const app = express()
dotenv.config();

//App uses Configuration;
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(morgan("common"));

//Connection with routes and static
app.set("/static", express.static("./static"));
app.use("/", router);

//DB AND SERVER CONNECTION
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log("MONGOOSE WORKING");
    app.listen(8000);
    console.log("Backend Server Currently Running and Ready for Requests")
}).catch( (err) => {
    console.log("MONGOOSE ERROR: " + err);
});
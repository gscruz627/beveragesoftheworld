// Core Imports
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes.js";
import {router as adminRouter} from "./adminroutes.js";
import {v2 as cloudinary} from "cloudinary";
import {isAdmin, verifyToken} from "./middleware.js";


// App uses import
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import multer, { memoryStorage } from "multer";
import { newBeverageController } from "./controllers/admin.js";
const upload = multer({
    storage: multer.memoryStorage()
})
//Core Configuration
const app = express()
dotenv.config();

//App uses Configuration;
app.use(express.json())
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(morgan("common"));
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
export const cloudinaryUpload = (imageBuffer) => {
    return new Promise( (resolve, reject) => {
        cloudinary.uploader.upload_stream( { resource_type: 'auto' }, async function(error, result){
            if (error) {
              reject(error)
              console.error(error);
            } else {
              resolve(result.secure_url)
            }
          }).end(imageBuffer);
    })
  }

//Connection with routes and static
app.set("/static", express.static("./static"));
app.use("/API", router);
app.use("/admin", adminRouter);

app.post("/admin/beverages/new", verifyToken, upload.single("file"), isAdmin, newBeverageController);
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

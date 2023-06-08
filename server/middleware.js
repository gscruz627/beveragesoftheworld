import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "./models/User.js";
dotenv.config();
export const verifyToken = async (req, res, next) => {
    try{
        let token = req.header("Authorization");
        if(!token) return res.status(401).json({message: "Invalid 'jsonwebtoken' token"})
        if(token.startsWith(process.env.JWT_KEY)){
            token = token.slice(7, token.length);
        } else { 
            res.status(401).json({error: "Forbidden"})
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(500).json({err: "Error on middleware verifyToken: " + err});
    }
}
export const isAdmin = async (req, res, next) => {
    try{
        const { id } = req.body;
        const user = await User.findById(id);
        if(user.get('admin')){
            next();
        } else {
            res.status(403).json({err: "Unauthorized account, check your privilege"});
        }
    } catch(err){
        res.status(500).json({err: "Error on middleware isAdmin: " + err})
    }
}
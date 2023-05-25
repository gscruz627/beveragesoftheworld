import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const verifyToken = async (req, res, next) => {
    try{
        let token = req.header("Auth");
        if(!token) return res.status(401).json({message: "Invalid 'jsonwebtoken' token"})
        if(token.startsWith(process.env.JWT_KEY)){
            token = token.slice(14, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(500);
    }
}
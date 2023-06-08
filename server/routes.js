import express from "express";
import {
    getBeverageController,
    loginController,
    registerController,
    getUserController,
    getBeveragesController,
    addToCartBeverageController,
    removeFromCartBeverageController
} from "./controllers/general.js";

const router = express.Router();

// Routes to Controllers
router.get("/beverages", getBeveragesController);
router.get("/beverage/:id", getBeverageController);
router.get("/user/:id", getUserController);

router.patch("/cart/add/:id", addToCartBeverageController);
router.patch("/cart/remove/:id", removeFromCartBeverageController);
router.post("/register", registerController);
router.post("/login", loginController);


export default router;
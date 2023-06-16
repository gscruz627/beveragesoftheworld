import express from "express";
import {
    getBeverageController,
    loginController,
    registerController,
    getUserController,
    getBeveragesController,
    addToCartBeverageController,
    removeFromCartBeverageController,
    countriesController,
    cleanCartController
} from "./controllers/general.js";

const router = express.Router();

// Routes to Controllers
router.get("/beverages", getBeveragesController);
router.get("/beverage/:id", getBeverageController);
router.get("/user/:id", getUserController);
router.get("/countries", countriesController);

router.patch("/cart/add/:id", addToCartBeverageController);
router.patch("/cart/remove/:id", removeFromCartBeverageController);
router.patch("/cart/clean", cleanCartController);
router.post("/register", registerController);
router.post("/login", loginController);


export default router;
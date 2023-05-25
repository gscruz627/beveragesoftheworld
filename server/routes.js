import express from "express";
import {
    allBeveragesController,
    getBeverageController
} from "./controllers/general.js";
import {
    getUserController
} from "./conrollers/auth.js";

const router = express.Router();

// Routes to Controllers
router.get("/beverages", allBeveragesController);
router.get("/beverage/:id", getBeverageController);
router.get("/user/:id", getUserController);

router.patch("/cart/add/:id", addToCartBeverageController);
router.patch("/cart/remove/:id", removeFromCartBeverageController);
router.post("/createUser", createUserController);


export default router;
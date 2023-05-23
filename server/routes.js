import express from "express";
import {
    allBeveragesController,
    getBeverageController
} from "./controllers/general.js";
import {
    getUserController
}

const router = express.Router();

// Routes to Controllers
router.get("/beverages", allBeveragesController);
router.get("/beverage/:id", getBeverageController);

router.patch("/beverages/add/:id", addToCartBeverageController);
router.patch("/beverages/remove/:id", removeFromCartBeverageController);
router.get("/user/:id", getUserController);

export default router;
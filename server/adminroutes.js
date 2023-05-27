import express from "express";
import {
    newBeveragesController,
    beverageChangePriceController,
    beveragesChangeAmountController
} from "./controllers/admin.js";
import {verifyToken, isAdmin} from "./middleware.js";
const router = express.Router();

router.patch("/beverages/changeprice", verifyToken, isAdmin, beverageChangePriceController);
router.patch("/beverages/changeAmount", verifyToken, isAdmin, beveragesChangeAmountController);

export default router;
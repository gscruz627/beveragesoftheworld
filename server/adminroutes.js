import express from "express";
import {
    beverageChangePriceController,
    beverageChangeAmountController
} from "./controllers/admin.js";
import {verifyToken, isAdmin} from "./middleware.js";
export const router = express.Router();

router.patch("/beverages/changeprice", verifyToken, isAdmin, beverageChangePriceController);
router.patch("/beverages/changeAmount", verifyToken, isAdmin, beverageChangeAmountController);
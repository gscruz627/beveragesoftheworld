import express from "express";
import {
    newBeveragesController,
    beverageChangePriceController,
    beveragesChangeAmountController
} from "./controllers/admin.js";
const router = express.Router();

router.post("/beverages/new", newBeveragesController);
router.patch("/beverages/changeprice", beverageChangePriceController);
router.patch("/beverages/changeAmount", beveragesChangeAmountController);
export default router;
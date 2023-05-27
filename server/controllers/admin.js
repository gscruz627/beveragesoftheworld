import { cloudinaryUpload } from "..index.js";
import Beverage from "../models/Beverage";
export const newBeverageController = async (req, res) => {
  try {
    const { name, price, amount, country } = req.body;
    const beverage = new Beverage({
      name: name,
      cost: price,
      stock: amount,
      image: "",
    });

    let filename = "";
    cloudinaryUpload(req.file.buffer).then(async (secure_url) => {
      beverage.image = secure_url;
      const savedBeverage = await beverage.save();
    });
    res.status(201).json(beverage);
  } catch (err) {
    res.status(500).json({ error: "Error on new Beverage: " + err });
  }
};

export const beverageChangePriceController = async (req, res) => {
  try {
    const { id, newprice } = req.body;
    const beverage = await Beverage.findById(id);
    beverage.cost = newprice;
    const savedBeverage = await beverage.save();
    res.status(201).json(savedBeverage);
  } catch (err) {
    res.status(500).json({ err: "Error on beverage change price: " + err });
  }
};
export const beverageChangeAmountController = async (req, res) => {
  try {
    const { id, newamount } = req.body;
    const beverage = await Beverage.findById(id);
    beverage.stock = newamount;
    const savedBeverage = await beverage.save();
    res.status(201).json(savedBeverage);
  } catch (err) {
    res.status(500).json({ err: "Error on beverage change stock: " + err });
  }
};
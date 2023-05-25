import Beverage from "../models/Beverage";
import User from "../models/User";

export const beveragesController = async (req, res) => {
  try {
    const beverages = await Beverage.find();
    res.status(200).json(beverages);
  } catch (err) {
    res.status(500).json({ error: "Error on beverages: " + err });
  }
};

export const getBeverageController = async (req, res) => {
  try {
    const { id } = req.body;
    const beverage = await Beverage.findById(id);
    res.status(200).json(beverage);
  } catch (err) {
    res.status(500).json({ error: "Error on getBeverage: " + err });
  }
};

export const addToCartBeverageController = async (req, res) => {
    try{
        const { beverageId, userId, amount } = req.body;
        const user = await User.findById(userId);
        const beverage = await Beverage.findById(beverageId);
        user.cart.set(beverage._id, amount);
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch(err) {
        res.status(500).json({ error: "Error on addToCart: " + err})
    }
}

export const removeFromCartBeverageController = async (req, res) => {
    try{
        const { beverageId, userId, amount } = req.body;
        const user = await User.findById(userId);
        const beverage = await Beverage.findById(beverageId);
        user.cart.delete(beverage._id);
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch(err) {
        res.status(500).json({ error: "Error on removeFromCart: " + err})
    }
}

export const createUserController = async (req, res) => {
  try{
    const {username, password} = req.body;
    const 
  } catch(err) {
    res.status(500).json({err: "Error on User Creation: " + err})
  }
}
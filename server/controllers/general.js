import Beverage from "../models/Beverage";
import User from "../models/User";
import bcrypt from "bcrypt";

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
  try {
    const { beverageId, userId, amount } = req.body;
    const user = await User.findById(userId);
    const beverage = await Beverage.findById(beverageId);
    user.cart.set(beverage._id, amount);
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: "Error on addToCart: " + err });
  }
};

export const removeFromCartBeverageController = async (req, res) => {
  try {
    const { beverageId, userId, amount } = req.body;
    const user = await User.findById(userId);
    const beverage = await Beverage.findById(beverageId);
    user.cart.delete(beverage._id);
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: "Error on removeFromCart: " + err });
  }
};

export const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const verifyUser = await User.find({ username: username });
    if (!verifyUser) {
      const salt = bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username: username,
        password: password,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } else {
      res.status(400).json({ message: "Username already taken" });
    }
  } catch (err) {
    res.status(500).json({ err: "Error on User Creation: " + err });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.find({ username: username });
    if (user) {
      const isPasswordTrue = await bcrypt.compare(password, user.password);
      if(isPasswordTrue){
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({user: user, token: token})
      } else {
        res.status(400).json({message: "Authentication error"})
      }
    } else {
      res.status(400).json({ message: "Authentication error" });
    }
  } catch (err) {
    res.status(500).json({ err: "Error on login: " + err });
  }
};

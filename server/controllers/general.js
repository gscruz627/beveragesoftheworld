import Beverage from "../models/Beverage.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import mongoose from "mongoose";

export const beveragesController = async (req, res) => {
  try {
    const beverages = await Beverage.find();
    res.status(200).json(beverages);
  } catch (err) {
    res.status(500).json({ error: "Error on beverages: " + err });
  }
};
export const countriesController = async (req, res) => {
  try{
    const countries = await Beverage.find().select("country").lean();
    let countriesReturn = countries.map( (item) => {return item.country})
    countriesReturn = [...new Set(countriesReturn)]
    res.status(200).json(countriesReturn);
  } catch(err) {
    res.status(500).json({error: "Error on countries: " + err})
  }
}
export const getBeverageController = async (req, res) => {
  try {
    const { id } = req.body;
    const beverage = await Beverage.findById(id);
    res.status(200).json(beverage);
  } catch (err) {
    res.status(500).json({ error: "Error on getBeverage: " + err });
  }
};
export const getBeveragesController = async (req, res) => {
  try{
    const { filter, country, type } = req.query;
    let beverages;
    switch(filter){
      case "all":
        beverages = await Beverage.find();
        res.status(200).json(beverages);
        break;
      case "country":
        beverages = await Beverage.find({"country":country});
        res.status(200).json(beverages);
        break;
      case "type":
        beverages = await Beverage.find({"type":type});
        res.status(200).json(beverages);
        break;
    };
  } catch(err) {
    res.status(500).json({erro: "Error on getBeverages: " + err})
  }
}
export const addToCartBeverageController = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, amount } = req.body;
    let user = await User.findOneAndUpdate(
      { _id: userId, 'cart.id': id },
      { $inc: { 'cart.$.amount': amount } },
      { new: true }
    );
    
    if (user) {
      
    } else {
      const beverage = await Beverage.findById(id);
      user = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            cart: {
              id: id,
              name: beverage.name,
              amount: amount,
              picture: beverage.picture,
              price: beverage.cost
            },
          },
        },
        { new: true }
      );
    }
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: "Error on addToCart: " + err });
  }
};

export const removeFromCartBeverageController = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    user.cart = user.cart.filter( (item) => item.id !== id);
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: "Error on removeFromCart: " + err });
  }
};
export const cleanCartController = async (req, res) => {
  try{
    const { userId } = req.body;
    const user = await User.findById(userId);
    user.cart = [];
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch(err){
    res.status(500).json({error: "Error on clean cart: " + err})
  }
}
export const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const verifyUser = await User.findOne({ username: username });
    if (!verifyUser) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username: username,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET);

      res.status(201).json({user: savedUser, token: token});
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
    const user = await User.findOne({ username: username });
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

export const getUserController = async (req, res) => {
  try{
    const { id } = req.params;
    const user = await User.findById(id);
  } catch(err){
    res.satus(500).json({error: "Error on getUser: " + err})
  }
}
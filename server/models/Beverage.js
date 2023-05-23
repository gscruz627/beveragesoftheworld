import mongoose from "mongoose";
const BeverageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    }
});

const Beverage = mongoose.model("Beverage", BeverageSchema);
export default Beverage;
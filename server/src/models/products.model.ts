import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name"],
    },
    price: {
      type: Number,
      required: [true, "Please enter price"],
    },
    photo: {
      type: String,
      required: [true, "Please upload photo"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter stock quantity"],
    },
    category: {
      type: String,
      required: [true, "Please define category"],
      trim: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", schema);

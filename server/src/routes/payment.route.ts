import express from "express";
import { adminOnly } from "../middlewares/auth.middleware.js";
import {
  applyDiscount,
  createPaymentIntent,
  deleteCoupon,
  getAllCoupons,
  newCoupon,
} from "../controllers/payment.controller.js";

const app = express.Router();

app.post("/create", createPaymentIntent);

app.get("/discount", applyDiscount);

app.post("/coupon/new", adminOnly, newCoupon);

app.get("/coupon/all", adminOnly, getAllCoupons);

app.delete("/coupon/:id", adminOnly, deleteCoupon);

export default app;

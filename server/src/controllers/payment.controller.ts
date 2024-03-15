import { stripe } from "../app.js";
import { AsyncHandler } from "../middlewares/error.middleware.js";
import { Coupon } from "../models/coupon.model.js";
import ErrorHandler from "../utils/utilityClass.utils.js";

export const createPaymentIntent = AsyncHandler(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount) return next(new ErrorHandler("Please enter amount", 400));

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount) * 100,
    currency: "inr",
  });

  return res.status(201).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});

export const newCoupon = AsyncHandler(async (req, res, next) => {
  const { coupon, amount } = req.body;

  if (!coupon || !amount)
    return next(new ErrorHandler("Please enter both coupon and amount", 400));

  await Coupon.create({ code: coupon, amount });

  return res.status(201).json({
    success: true,
    message: `Coupon ${coupon} Created Successfully`,
  });
});

export const applyDiscount = AsyncHandler(async (req, res, next) => {
  const { code } = req.query;

  const discount = await Coupon.findOne({ code });

  if (!discount) {
    return next(new ErrorHandler("Invalid Coupon Code", 400));
  }

  return res.status(200).json({
    success: true,
    discount: discount.amount,
  });
});

export const getAllCoupons = AsyncHandler(async (req, res, next) => {
  const coupons = await Coupon.find({});

  return res.status(200).json({
    success: true,
    coupons,
  });
});

export const deleteCoupon = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const coupon = await Coupon.findByIdAndDelete(id);

  if (!coupon) {
    return next(new ErrorHandler("Inavlid Coupon ID", 400));
  }

  return res.status(200).json({
    success: true,
    message: `Coupon ${coupon} deleted Successfully`,
  });
});

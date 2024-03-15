import { Request } from "express";
import { AsyncHandler } from "../middlewares/error.middleware.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.model.js";
import { invalidateCache, reduceStock } from "../utils/features.utils.js";
import ErrorHandler from "../utils/utilityClass.utils.js";
import { myCache } from "../app.js";

export const myOrders = AsyncHandler(async (req, res, next) => {
  const { id: user } = req.query;

  let orders = [];

  if (myCache.has(`my-orders-${user}`)) {
    orders = JSON.parse(myCache.get(`my-orders-${user}`) as string);
  } else {
    orders = await Order.find({ user });
    myCache.set(`my-orders-${user}`, JSON.stringify(orders));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

export const allOrders = AsyncHandler(async (req, res, next) => {
  const key = `all-orders`;

  let orders = [];

  if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
  else {
    orders = await Order.find().populate("user", "name");
    myCache.set(key, JSON.stringify(orders));
  }
  return res.status(200).json({
    success: true,
    orders,
  });
});

export const getSingleOrder = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let order;

  if (myCache.has(`order-${id}`)) {
    order = JSON.parse(myCache.get(`order-${id}`) as string);
  } else {
    order = await Order.findById(id).populate("user", "name");

    if (!order) return next(new ErrorHandler("Order not found", 404));

    myCache.set(`order-${id}`, JSON.stringify(order));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

export const newOrder = AsyncHandler(
  async (req: Request<{}, {}, NewOrderRequestBody>, res, next) => {
    const {
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    } = req.body;

    if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total) {
      return next(new ErrorHandler("Please provide all fields", 400));
    }

    const order = await Order.create({
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    });

    await reduceStock(orderItems);

    invalidateCache({
      product: true,
      order: true,
      admin: true,
      userId: user,
      productId: order.orderItems.map((i) => String(i.productId)),
    });

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
    });
  }
);

export const processOrder = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) return next(new ErrorHandler("Order not found", 404));

  switch (order.status) {
    case "Processing":
      order.status = "Shipped";
      break;

    case "Shipped":
      order.status = "Delivered";
      break;

    default:
      "Delivered";
      break;
  }

  await order.save();

  invalidateCache({
    product: false,
    order: true,
    admin: true,
    userId: order.user,
    orderId: String(order._id),
  });

  res.status(201).json({
    success: true,
    message: "Order Processed Successfully",
  });
});

export const deleteOrder = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) return next(new ErrorHandler("Order not found", 404));

  await order.deleteOne();

  invalidateCache({
    product: false,
    order: true,
    admin: true,
    userId: order.user,
    orderId: String(order._id),
  });

  res.status(201).json({
    success: true,
    message: "Order Deleted Successfully",
  });
});

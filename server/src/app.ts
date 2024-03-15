import express from "express";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";

// importing routes
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";
import orderRoute from "./routes/order.route.js";
import paymentRoute from "./routes/payment.route.js";
import dashboardRoute from "./routes/stats.route.js";

import { connectDB } from "./utils/features.utils.js";
import { ErrorMiddleware } from "./middlewares/error.middleware.js";
import Stripe from "stripe";

config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
const MONGO_URI = process.env.URI || "";
const DB_NAME = process.env.DB_NAME || "";

const STRIPE_KEY = process.env.STRIPE_KEY || "";

connectDB(MONGO_URI, DB_NAME);

export const stripe = new Stripe(STRIPE_KEY);
export const myCache = new NodeCache();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// using user routes
app.use("/api/v1/user", userRoute);

// using product routes
app.use("/api/v1/product", productRoute);

// using order routes
app.use("/api/v1/order", orderRoute);

// using payment routes
app.use("/api/v1/payment", paymentRoute);

// using dashboard routes
app.use("/api/v1/dashboard", dashboardRoute);

app.use("/uploads", express.static("uploads"));

app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});

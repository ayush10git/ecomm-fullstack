import express from "express";
import { adminOnly } from "../middlewares/auth.middleware.js";
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts } from "../controllers/stats.controller.js";

const app = express.Router();

app.get("/stats", adminOnly, getDashboardStats);

app.get("/pie", adminOnly, getPieCharts);

app.get("/bar", adminOnly, getBarCharts);

app.get("/line", adminOnly, getLineCharts);

export default app;
import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  newUser,
} from "../controllers/user.controller.js";
import { adminOnly } from "../middlewares/auth.middleware.js";

const app = express.Router();

app.post("/new", newUser);

app.get("/all", adminOnly, getAllUsers);

app.get("/:id", getUser);

app.delete("/:id", adminOnly, deleteUser);

export default app;

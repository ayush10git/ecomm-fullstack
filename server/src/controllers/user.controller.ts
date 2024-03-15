import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";
import { NewUserReqBody } from "../types/types.js";
import { AsyncHandler } from "../middlewares/error.middleware.js";
import ErrorHandler from "../utils/utilityClass.utils.js";

export const newUser = AsyncHandler(async (req, res, next) => {
  const { name, email, photo, gender, _id, dob } = req.body;

  let user = await User.findById(_id);

  if (user) {
    return res.status(200).json({
      success: true,
      message: `Welcome, ${user.name}`,
    });
  }

  if (!_id || !name || !photo || !gender || !email || !dob) {
    return next(new ErrorHandler("Please add all fields", 400));
  }

  user = await User.create({
    name,
    email,
    photo,
    gender,
    _id,
    dob: new Date(dob),
  });

  return res.status(201).json({
    success: true,
    message: `Welcome, ${user.name}`,
  });
});

export const getAllUsers = AsyncHandler(async (req, res, next) => {
  const users = await User.find({});

  return res.status(200).json({
    success: true,
    users,
  });
});

export const getUser = AsyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler("Invalid ID", 400));
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

export const deleteUser = AsyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler("Invalid ID", 400));
  }

  await user.deleteOne();

  return res.status(200).json({
    success: true,
    message: "User Deleted successfully",
  });
});

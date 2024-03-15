import { User } from "../models/user.model.js";
import ErrorHandler from "../utils/utilityClass.utils.js";
import { AsyncHandler } from "./error.middleware.js";

export const adminOnly = AsyncHandler(async (req, res, next) => {
    const { id } = req.query;

    if (!id) {
        return next(new ErrorHandler("Please Login first!", 400));
    }

    const user = await User.findById(id);

    if (!user) {
        return next(new ErrorHandler("Unauthenticated User!", 401));
    }

    if (user.role !== "admin") {
        return next(new ErrorHandler("You're not authorized to change user database", 400));
    }

    next();
})
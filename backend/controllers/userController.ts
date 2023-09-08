import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import createError from "../utils/createError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const { _id, username, email } = await newUser.save();
    res.status(201).send({ _id, username, email });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(400, "Incorrect username of password!"));

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return next(createError(400, "Incorrect username of password!"));

    res.status(200).send({ _id: user._id, username: user.username });
  } catch (error) {
    next(error);
  }
};

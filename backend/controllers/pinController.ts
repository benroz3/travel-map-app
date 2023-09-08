import { Request, Response, NextFunction } from "express";
import Pin from "../models/Pin";

export const createPin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newPin = new Pin({
    username: req.body.username,
    title: req.body.title,
    desc: req.body.desc,
    rating: req.body.rating,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  try {
    const savedPin = await newPin.save();
    res.status(201).send(savedPin);
  } catch (error) {
    next(error);
  }
};

export const getAllPins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pins = await Pin.find();
    res.status(200).send(pins);
  } catch (error) {
    next(error);
  }
};

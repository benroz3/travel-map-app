import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import pinsRoute from "./routes/pins";
import usersRoute from "./routes/users";
import { CustomError } from "./types/types";

//configs
const app = express();
dotenv.config();

//mongoDB connection
const mongoURL = process.env.MONGO_URL || "";
const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB!");
  });
};

//middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

app.use("/api/users", usersRoute);
app.use("/api/pins", pinsRoute);

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong!";
    return res.status(errorStatus).send(errorMessage);
  }
);

//start server
app.listen(8080, () => {
  connectMongo();
  console.log(`Server running.`);
});

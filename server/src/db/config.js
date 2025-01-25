import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { State } from "../models/state.model.js";
import { District } from "../models/district.model.js";
import { Taluka } from "../models/taluka.model.js";
import { Village } from "../models/village.model.js";

export const connectMongoDB = async (url) => {
  try {
    await mongoose.connect(`${url}/${DB_NAME}`);
    console.log("MongoDb connected successfully!");
  } catch (error) {
    console.log("Error in connection with mongodb: ", error);
    throw error;
  }
};

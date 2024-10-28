import mongoose from "mongoose";
import { UserSchema } from "../Schemas/UserSchema.js";

export const UserModel = new mongoose.model('UserModel', UserSchema);
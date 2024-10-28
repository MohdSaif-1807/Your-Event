import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    'google_id': {
        type: String
    },
    'email': {
        type: String
    },
    'profile_Img': {
        type: String
    },
    'name': {
        type: String
    }
})
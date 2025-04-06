import { strict } from "assert";
import mongoose from "mongoose";
import { type } from "os";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true,"please provide a username"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true,"please provide a email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true,"please provide a password"],
    },
    isVarified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,

    
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

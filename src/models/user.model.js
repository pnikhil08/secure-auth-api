import mongoose from "mongoose";

const userShema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is  required"],
    unique: [true, "Ussername Must be unique"],
  },
  email: {
    type: String,
    required: [true, "email is  required"],
    unique: [true, "email Must be unique"],
  },
  password: {
    type: String,
    required: [true, "Password is  required"],
  },
  verified : {
    type : Boolean,
    default : false
  }
});

const userModel = mongoose.model("users", userShema);

export default userModel;
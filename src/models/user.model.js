// import mongoose from "mongoose";

// const userShema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "Username is  required"],
//     unique: [true, "Ussername Must be unique"],
//   },
//   email: {
//     type: String,
//     required: [true, "email is  required"],
//     unique: [true, "email Must be unique"],
//   },
//   password: {
//     type: String,
//     required: [true, "Password is  required"],
//   },
//   verified : {
//     type : Boolean,
//     default : false
//   }
// });

// const userModel = mongoose.model("users", userShema);

// export default userModel;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Unique username of the user
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username must be unique"],
      trim: true,
    },

    // Unique email address of the user
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      lowercase: true,
      trim: true,
    },

    // Hashed password of the user
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    // Indicates whether the user's email has been verified
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the User model
const userModel = mongoose.model("users", userSchema);

export default userModel;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userSchema);

export default Users;

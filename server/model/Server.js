import mongoose from "mongoose";

const serverSchema = new mongoose.Schema({
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
  editors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Editors",
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  admin: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
});

const Server = mongoose.model("Server", serverSchema);

export default Server;

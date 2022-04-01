import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: "Users",
    },
    text: {
      type: String,
      required: true,
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      required: "Channels",
    },
  },
  {
    timestamps: true,
  }
);

const Messages = mongoose.model("Messages", messageSchema);

export default Messages;

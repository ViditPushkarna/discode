import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
  ],
  server: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Server",
  },
});

const Channels = mongoose.model("Channels", channelSchema);

export default Channels;

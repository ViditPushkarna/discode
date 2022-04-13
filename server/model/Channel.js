import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  server: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Server",
  },
});

const Channels = mongoose.model("Channels", channelSchema);

export default Channels;

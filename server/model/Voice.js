import mongoose from "mongoose";

const voiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  server: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Server",
  },
});

const Voices = mongoose.model("voices", voiceSchema);

export default Voices;

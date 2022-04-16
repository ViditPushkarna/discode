import mongoose from "mongoose";

const editorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  server: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Server",
  },
  data: {
    type: String,
  },
  lang: {
    type: String,
    required: true,
  },
});

const Editors = mongoose.model("Editors", editorSchema);

export default Editors;

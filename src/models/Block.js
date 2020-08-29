import mongoose, { Schema } from "mongoose";

const BlockSchema = new Schema({
  note_id: {
    type: Schema.Types.ObjectId,
    ref: "Note",
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

export default mongoose.model("Block", BlockSchema);

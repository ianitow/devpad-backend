import mongoose, { Schema } from "mongoose";

const TagSchema = new Schema({
  name: String,
  color: {
    type: String,
    min: 4,
    max: 7,
    default: "#000",
    match: [/^#([0-9a-f]{3}){1,2}$/i, "Please fill a correct color."],
  },
  user_id: { type: Schema.Types.ObjectId },
});

export default mongoose.model("Tag", TagSchema);

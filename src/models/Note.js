import mongoose, { Schema } from 'mongoose';

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author_id: { type: Schema.Types.ObjectId, ref: 'User' },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tag',
    },
  ],
  content: Object,
  isRedirect: Boolean,
  url: String,
  path: String
});

export default mongoose.model('Note', NoteSchema);

"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const NoteSchema = new (0, _mongoose.Schema)({
  title: {
    type: String,
    required: true,
  },
  author_id: { type: _mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [
    {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
    },
  ],
  content: Object,
  isRedirect: Boolean,
  url: String,
  path: String
});

exports. default = _mongoose2.default.model('Note', NoteSchema);

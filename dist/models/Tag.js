"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const TagSchema = new (0, _mongoose.Schema)({
  name: String,
  color: {
    type: String,
    min: 4,
    max: 7,
    default: '#000',
    match: [/^#([0-9a-f]{3}){1,2}$/i, 'Please fill a correct color.'],
  },
  user_id: { type: _mongoose.Schema.Types.ObjectId, required: true },
});

exports. default = _mongoose2.default.model('Tag', TagSchema);

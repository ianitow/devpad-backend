"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

const UserSchema = new (0, _mongoose.Schema)(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 15,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      min: 6,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) next();

  this.password = await _bcrypt2.default.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(hash) {
    return _bcrypt2.default.compare(hash, this.password);
  },

  generateToken() {
    return _jsonwebtoken2.default.sign({ id: this.id }, 'secret', {
      expiresIn: 86400,
    });
  },
};

exports. default = _mongoose2.default.model('User', UserSchema);

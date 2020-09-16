"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
require('dotenv/config');
const mongo_URL =
  process.env.MONGO_URL ||
  `mongodb://${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

_mongoose2.default.connect(mongo_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

exports. default = _mongoose2.default.connection;

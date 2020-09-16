"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _auth = require('../middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _NoteController = require('../controllers/NoteController'); var _NoteController2 = _interopRequireDefault(_NoteController);
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _TagController = require('../controllers/TagController'); var _TagController2 = _interopRequireDefault(_TagController);
/* GET home page. */
const routes = new (0, _express.Router)();
routes.get('/', function (req, res, next) {
  return res.json({
    msg: 'Hello World!',
  });
});
//Session

routes.post('/register', _UserController2.default.register);
routes.post('/login', _UserController2.default.login);
routes.use(_auth2.default);
//Note
routes.get('/notes', _NoteController2.default.index);
routes.get('/note/:id', _NoteController2.default.show);
routes.get('/view/:path', _NoteController2.default.path);
routes.post('/note', _NoteController2.default.create);
routes.put('/note/:id', _NoteController2.default.update);
routes.delete('/note/:id', _NoteController2.default.delete);

//User
routes.get('/user', _UserController2.default.show);

//Tags
routes.get('/tag', _TagController2.default.show);
routes.post('/tag', _TagController2.default.create);
routes.delete('/tag/:id', _TagController2.default.delete);
exports. default = routes;

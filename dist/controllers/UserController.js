"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async register(req, res) {
    const { email, username } = req.body;

    try {
      // Verificar se o usuário existe
      if (await _User2.default.findOne({ email })) {
        return res.status(400).json({ error: 'Usuário já existe!' });
      }

      if (await _User2.default.findOne({ username })) {
        return res.status(400).json({ error: 'Usuário já existe!' });
      }
      // Criar usuário
      const user = await _User2.default.create(req.body);
      return res.json({ user });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'Erro ao cadastrar usuário' });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;

      //Procurar usuário
      const user = await _User2.default.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      //Verificar senha
      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: 'Senha errada!' });
      }

      //Gerar token do usuário
      return res.json({
        token: user.generateToken(),
        user,
      });
    } catch (err) {
      console.log(err);

      return res.status(400).json({ error: 'Erro ao realizar login' });
    }
  }

  async show(req, res) {
    try {
      const { user_id } = req;
      const user = await (
        await _User2.default.findById(user_id).select('-password')
      ).exec();
      return res.json({ user });
    } catch (err) {
      return res
        .status(404)
        .json({ error: 'Não foi possivel obter as informações do usuário.' });
    }
  }
}

exports. default = new UserController();

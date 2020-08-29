import User from "../models/User";

class UserController {
  async register(req, res) {
    const { email, username } = req.body;

    try {
      // Verificar se o usuário existe
      if (await User.findOne({ email })) {
        return res.status(400).json({ error: "Usuário já existe!" });
      }
      // Criar usuário
      const user = await User.create(req.body);
      return res.json({ user });
    } catch (err) {
      return res.status(400).json({ error: "Erro ao cadastrar usuário" });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;

      //Procurar usuário
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      //Verificar senha
      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: "Senha errada!" });
      }

      //Gerar token do usuário
      return res.json({
        token: user.generateToken(),
      });
    } catch (err) {
      console.log(err);

      return res.status(400).json({ error: "Erro ao realizar login" });
    }
  }

  async show(req, res) {
    try {
      const { user_id } = req;
      const user = await User.findById(user_id).select("-password").exec();
      return res.json({ user });
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Não foi possivel obter as informações do usuário." });
    }
  }
}

export default new UserController();

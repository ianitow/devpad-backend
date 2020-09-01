import Note from '../models/Note';

class NoteController {
  async index(req, res) {
    const note = await Note.find({
      author_id: req.user_id,
    }).populate('tags');

    return res.json(note);
  }

  async show(req, res) {
    const { user_id } = req;
    const { id } = req.params;
    try {
      const note = await Note.findById(id);

      if (!note) {
        return res.status(400).json({ error: 'Anotação não encontrada!' });
      }

      if (note.author_id != user_id) {
        return res.status(400).json({ error: 'Usuário inválido!' });
      }

      return res.json(note);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao recuperar dados!' });
    }
  }

  async create(req, res) {
    let { title, author_id, tags, content, isRedirect, url } = req.body;

    try {
      if (author_id != req.user_id) {
        return res.status(400).json({ error: 'Usuário inválido!' });
      }

      let note = {
        title,
        author_id,
        tags,
        isRedirect,
        content,
        url,
      };

      //Garantir que não seja ambos os casos
      if (isRedirect) {
        note.content = [];
      } else note.url = null;

      const notee = await Note.create(note);
      return res.json({ notee });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao cadastrar anotação' });
    }
  }
  async update(req, res) {}
  async store(req, res) {}
}

export default new NoteController();

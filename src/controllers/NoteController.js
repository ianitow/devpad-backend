import Note from "../models/Note";

class NoteController {
  async index(req, res) {
    const note = await Note.find({
      user: req.user_id,
    });

    return res.json(note);
  }

  async show(req, res) {}
  async store(req, res) {}
  async update(req, res) {}
  async store(req, res) {}
}

export default new NoteController();

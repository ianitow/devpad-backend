import Note from '../models/Note';

class NoteController {
  async index(req, res) {
    console.log(req.user_id);
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
        return res.status(400).json({ error: 'Note was not found!' });
      }

      if (note.author_id != user_id) {
        return res.status(400).json({ error: 'Invalid user!' });
      }

      return res.status(200).json(note);
    } catch (err) {
      return res.status(400).json({ error: 'Error retrieving data!' });
    }
  }

  async create(req, res) {
    let { title, tags, content, isRedirect, url } = req.body;
    try {
      let note = {
        title,
        author_id: req.user_id,
        tags,
        isRedirect,
        content,
        url,
      };

      if (isRedirect) {
        note.content = [];
      } else note.url = null;

      const note_data = await Note.create(note);
      return res.json(note_data);
    } catch (err) {
      return res.status(400).json({ error: 'Error registering note' });
    }
  }
  async update(req, res) {}

  async delete(req, res) {
    const { user_id } = req;
    const { id } = req.params;

    try {
      const note = await Note.findById(id);

      if (!note) {
        return res.status(400).json({ error: 'Note was not found!' });
      }

      if (note.author_id != user_id) {
        return res.status(400).json({ error: 'Invalid user!' });
      }

      await note.remove();

      return res
        .status(200)
        .json({ message: 'Note annotation has been deleted!' });
    } catch (err) {
      return res.status(400).json({ error: 'Error deleting data!' });
    }
  }
}

export default new NoteController();

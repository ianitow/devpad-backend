import Note from '../models/Note';
import createPath from '../services/NotePath';
class NoteController {
  async index(req, res) {
    const note = await Note.find({
      author_id: req.user_id,
    })
      .populate('tags')
      .select('-content');

    return res.json(note);
  }

  async show(req, res) {
    const { user_id } = req;
    const { id } = req.params;
    try {
      const note = await Note.findById(id);

      if (!note) {
        return res.status(404).json({ error: 'Note was not found!' });
      }

      if (note.author_id != user_id) {
        return res.status(401).json({ error: 'Invalid user!' });
      }

      return res.status(200).json(note);
    } catch (err) {
      return res.status(400).json({ error: 'Error retrieving data!' });
    }
  }

  async path(req, res) {
    const { user_id } = req;
    const { path } = req.params;
    try {
      const note = await Note.findOne({ path });

      if (!note) {
        return res.status(404).json({ error: 'Note was not found!' });
      }

      if (note.author_id != user_id) {
        return res.status(401).json({ error: 'Invalid user!' });
      }

      return res.status(200).json(note);
    } catch (err) {
      return res.status(400).json({ error: 'Error retrieving data!' });
    }
  }

  async create(req, res) {
    let { title, tags, content, isRedirect, url } = req.body;
    try {
      const path = createPath(title);
      console.log(path);

      let note = {
        title,
        author_id: req.user_id,
        tags,
        isRedirect,
        content,
        url,
        path,
      };

      if (isRedirect) {
        note.content = [];
      } else note.url = null;

      const note_data = await Note.create(note);
      return res.status(201).json(note_data);
    } catch (err) {
      return res.status(400).json({ error: 'Error registering note' });
    }
  }

  async update(req, res) {
    const { user_id } = req;
    const { id } = req.params;
    const new_data = req.body;
    try {
      const note = await Note.findById(id);

      if (!note) {
        return res.status(404).json({ error: 'Note was not found!' });
      }

      if (note.author_id != user_id) {
        return res.status(401).json({ error: 'Invalid user!' });
      }

      const note_data = await Note.findOneAndUpdate({ _id: id }, new_data, {
        new: true,
      });

      return res.json(note_data);
    } catch (err) {
      return res.status(400).json({ error: 'Error updating data!' });
    }
  }

  async delete(req, res) {
    const { user_id } = req;
    const { id } = req.params;

    try {
      const note = await Note.findById(id);

      if (!note) {
        return res.status(404).json({ error: 'Note was not found!' });
      }

      if (note.author_id != user_id) {
        return res.status(401).json({ error: 'Invalid user!' });
      }

      await note.remove();

      return res
        .status(204)
        .json({ message: 'Note annotation has been deleted!' });
    } catch (err) {
      return res.status(400).json({ error: 'Error deleting data!' });
    }
  }
}

export default new NoteController();

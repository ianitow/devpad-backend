import Tag from "../models/Tag";

class TagController {
  async show(req, res) {
    const { user_id } = req;
    if (!user_id)
      return res.status(400).json({ error: "Key user_id not provided." });
    Tag.find({ user_id }).exec(function (err, tag) {
      if (err) {
        return res
          .status(500)
          .send({ error: "Error has occurred, check the logs" });
      } else {
        res.json(tag);
      }
    });
  }
  async create(req, res) {
    const { user_id } = req;
    const { name, color } = req.body;
    if (await Tag.findOne({ user_id, name })) {
      return res.status(400).json({ error: "Tag already created." });
    }
    const tag = new Tag({ user_id, name, color });
    await tag.save(function (err, tag) {
      if (err) return console.log("ERRO", err);

      res.send({ ...tag._doc, message: "Tag was created successfully" });
    });
  }

  async delete(req, res) {
    const { user_id } = req;
    const { id } = req.params;
    if (!user_id)
      return res.status(400).send({ error: "Key user_id not provided" });
    if (!id) return res.status(400).send({ error: "Key id not provided" });
    try {
      Tag.findOneAndRemove(
        {
          user_id,
          _id: id,
        },
        function (err, tag) {
          if (err)
            return res
              .status(400)
              .send({ error: "Error has occured, check the logs!" });
          if (tag) {
            return res.send({
              message: `Tag  was deleted successfully.`,
            });
          } else {
            res.send({ error: "Tag not exists" });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default new TagController();

import { Router } from "express";
import auth from "../middlewares/auth";
import NoteController from "../controllers/NoteController";
import UserController from "../controllers/UserController";
import TagController from "../controllers/TagController";
/* GET home page. */
const routes = new Router();
routes.get("/", function (req, res, next) {
  return res.json({
    msg: "Hello World!",
  });
});
//Session

routes.post("/register", UserController.register);
routes.post("/login", UserController.login);
routes.use(auth);
//Note
routes.get("/note", NoteController.index);

//User
routes.get("/user", UserController.show);

//Tags
routes.get("/tag", TagController.show);
routes.post("/tag", TagController.create);
routes.delete("/tag/:id", TagController.delete);
export default routes;

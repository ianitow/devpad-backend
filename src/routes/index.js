import { Router } from "express";
import auth from "../middlewares/auth";
import NoteController from "../controllers/NoteController";
import UserController from "../controllers/UserController";
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

export default routes;

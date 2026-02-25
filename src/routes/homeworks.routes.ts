import { Router } from "express";
import {
  createHomeworks,
  getHomeworks,
} from "../controllers/homework.controller.ts";

const homeworksRouter: Router = Router();
homeworksRouter.route("/").post(createHomeworks);
homeworksRouter.route("/").get(getHomeworks);

export { homeworksRouter };

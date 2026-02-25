import { Router } from "express";
import {
  createHomeworks,
  getHomeworks,
  getHomeworksbyStudentId,
} from "../controllers/homework.controller.ts";

const homeworksRouter: Router = Router();
homeworksRouter.route("/").post(createHomeworks);
homeworksRouter.route("/").get(getHomeworks);
homeworksRouter.route("/:studentId").get(getHomeworksbyStudentId);

export { homeworksRouter };

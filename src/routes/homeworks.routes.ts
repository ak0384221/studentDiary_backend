import { Router } from "express";
import {
  createHomeworks,
  getHomeworks,
  getHomeworksbyStudentId,
  updateHomeworkDescription,
} from "../controllers/homework.controller.ts";

const homeworksRouter: Router = Router();
homeworksRouter.route("/").post(createHomeworks);
homeworksRouter.route("/").get(getHomeworks);
homeworksRouter.route("/:studentId").get(getHomeworksbyStudentId);
homeworksRouter.route("/:id").put(updateHomeworkDescription);

export { homeworksRouter };

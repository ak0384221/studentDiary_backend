import { Router } from "express";
import {
  getHomeworkById,
  updateHomework,
} from "../controllers/homework.controller.ts";

const homeworkRouter: Router = Router();
homeworkRouter.route("/:id").get(getHomeworkById);
homeworkRouter.route("/:studentId/:homeworkId").patch(updateHomework);

export { homeworkRouter };

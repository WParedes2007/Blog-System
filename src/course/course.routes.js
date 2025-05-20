import { Router } from "express";
import { check } from "express-validator";
import { getCourses, createCourse, getCourseById } from "./course.controller.js";
import { validateCourse } from "../middlewares/validate-course.js";
const router = Router();

router.get("/", getCourses);

router.post(
  "/",
  [
    validateCourse
  ],
  createCourse
);

router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId()
  ],
  getCourseById
);

export default router;
import { Router } from "express";
import { check } from "express-validator";
import { getCourses, createCourse, getCourseById } from "./course.controller.js";

const router = Router();

router.get("/", getCourses);

router.post(
  "/",
  [
    check("name", "El nombre del curso es obligatorio").not().isEmpty(),
    check("description", "La descripción del curso es obligatoria").not().isEmpty()
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
import { check, validationResult } from "express-validator";

// Middleware de validación para crear o actualizar cursos
export const validateCourse = [
  check("name", "El nombre del curso es obligatorio").not().isEmpty(),
  check("name", "El nombre del curso debe tener al menos 3 caracteres").isLength({ min: 3 }),
  check("description", "La descripción del curso es obligatoria").not().isEmpty(),
  check("description", "La descripción debe tener al menos 10 caracteres").isLength({ min: 10 }),
  check("name", "El nombre del curso no debe ser un curso duplicado").custom(async (name) => {
    const existingCourse = await Course.findOne({ name });
    if (existingCourse) {
      throw new Error("El curso con este nombre ya existe.");
    }
  }),

  // Manejo de errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

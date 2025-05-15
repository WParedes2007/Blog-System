import { check } from "express-validator";
import { validationResult } from "express-validator";

export const validatePost = [
  check("title", "El título es obligatorio").not().isEmpty(),
  check("title", "El título debe tener al menos 5 caracteres").isLength({ min: 5 }),
  check("description", "La descripción es obligatoria").not().isEmpty(),
  check("description", "La descripción debe tener al menos 10 caracteres").isLength({ min: 10 }),
  check("course", "El curso es obligatorio").not().isEmpty(),
  check("course", "El curso debe ser un texto válido").isString(),

  // Manejo de errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
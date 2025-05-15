import { check } from "express-validator";
import { validationResult } from "express-validator";

export const validateComment = [
  check("content", "El contenido es obligatorio").not().isEmpty(),
  check("content", "El contenido debe tener al menos 5 caracteres").isLength({ min: 5 }),

  // Manejo de errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre del curso es obligatorio"],
    enum: ["Taller", "Tecnología", "Práctica Supervisada"],
  },
  description: {
    type: String,
    required: [true, "La descripción del curso es obligatoria"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
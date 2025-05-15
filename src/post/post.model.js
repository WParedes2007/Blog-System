import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "El título es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId, // Relación con Course
    ref: "Course", // Nombre del modelo referenciado
    required: [true, "El curso es obligatorio"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
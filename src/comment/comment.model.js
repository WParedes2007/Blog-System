import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // Referencia al modelo de publicaciones
    required: [true, "El ID de la publicación es obligatorio"],
  },
  name: {
    type: String,
    required: [true, "El nombre del autor es obligatorio"],
    default: "Anónimo", // Nombre por defecto si no se proporciona
  },
  content: {
    type: String,
    required: [true, "El contenido del comentario es obligatorio"],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Fecha del comentario
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
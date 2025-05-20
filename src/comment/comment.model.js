import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "El ID de la publicación es obligatorio"],
  },
  name: {
    type: String,
    required: [true, "El nombre del autor es obligatorio"],
    default: "Anónimo", 
  },
  content: {
    type: String,
    required: [true, "El contenido del comentario es obligatorio"],
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  status: {
      type: Boolean,
      default: true,
  }
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
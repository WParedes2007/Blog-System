import Comment from "../comment/comment.model.js";
import Post from "../post/post.model.js";
import mongoose from "mongoose";

export const addComment = async (req, res) => {
  let { postId, name, content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "El contenido del comentario no puede estar vacío" });
  }

  if (!name || name.trim() === "") {
    name = "Anónimo";
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "La publicación no existe" });
    }

    const newComment = new Comment({ postId, name, content });
    await newComment.save();

    res.status(201).json({ message: "Comentario agregado con éxito", comment: newComment });
  } catch (error) {
    res.status(400).json({ message: "Error al agregar el comentario", error });
  }
};

export const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  const { page = 1, limit = 10 } = req.query; 

  try {
    const comments = await Comment.find({ postId, status: true })
      .skip((page - 1) * limit) 
      .limit(limit) 
      .sort({ createdAt: -1 }); 

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los comentarios", error });
  }
};

export const editComment = async (req, res) => {
  const { commentId } = req.params;
  const { content, name } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "El contenido del comentario no puede estar vacío" });
  }

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    if (content) comment.content = content;
    if (name) comment.name = name;

    await comment.save();

    res.json({ message: "Comentario actualizado con éxito", comment });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el comentario", error });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: "ID de comentario no válido" });
  }

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    comment.status = false;
    await comment.save();

    return res.status(200).json({ message: "Comentario desactivado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al desactivar el comentario", error: error.message });
  }
};

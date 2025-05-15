import Comment from "../comment/comment.model.js";
import Post from "../post/post.model.js";

// Agregar un nuevo comentario
export const addComment = async (req, res) => {
  let { postId, name, content } = req.body;

  // Si el nombre es vacío o no está definido, asignar "Anónimo"
  if (!name || name.trim() === "") {
    name = "Anónimo";
  }

  try {
    // Verificar que la publicación exista
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "La publicación no existe" });
    }

    // Crear el comentario
    const newComment = new Comment({ postId, name, content });
    await newComment.save();

    res.status(201).json({ message: "Comentario agregado con éxito", comment: newComment });
  } catch (error) {
    res.status(400).json({ message: "Error al agregar el comentario", error });
  }
};

// Obtener todos los comentarios de una publicación
export const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 }); // Ordenar por fecha
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los comentarios", error });
  }
};
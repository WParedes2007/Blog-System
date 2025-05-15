import Post from "./post.model.js";
import Course from "../course/course.model.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("course", "name") 
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error al obtener las publicaciones:", error);
    res.status(500).json({ message: "Error al obtener las publicaciones" });
  }
};

export const createPost = async (req, res) => {
  const { title, description, course } = req.body;

  try {
    const existingCourse = await Course.findById(course);
    if (!existingCourse) {
      return res.status(404).json({ message: "El curso asociado no existe" });
    }

    const newPost = new Post({ title, description, course });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la publicación", error });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("course", "name"); // Incluye solo el campo "name" del curso
    if (!post) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error al obtener la publicación:", error);
    res.status(500).json({ message: "Error al obtener la publicación" });
  }
};
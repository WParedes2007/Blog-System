import Course from "./course.model.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los cursos" });
  }
};

export const createCourse = async (req, res) => {
  const { name, description } = req.body;

  const validCourses = ["Taller", "Tecnología", "Práctica Supervisada"];
  if (!validCourses.includes(name)) {
    return res.status(400).json({ message: `El curso debe ser uno de los siguientes: ${validCourses.join(", ")}` });
  }

  try {
    const newCourse = new Course({ name, description });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el curso", error });
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Curso no encontrado" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el curso" });
  }
};
import { Router } from "express";
import { getPosts, createPost, getPostById } from "./post.controller.js";
import { validatePost } from "../middlewares/validate-post.js";

const router = Router();

router.get("/", getPosts);
router.post("/", validatePost, createPost);
router.get("/:id", getPostById);

export default router;
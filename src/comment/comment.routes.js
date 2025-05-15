import { Router } from "express";
import { addComment, getCommentsByPost } from "./comment.controller.js";
import { validateComment } from "../middlewares/validate-comment.js";

const router = Router();

router.post("/", validateComment, addComment);

router.get("/:postId", getCommentsByPost);

export default router;
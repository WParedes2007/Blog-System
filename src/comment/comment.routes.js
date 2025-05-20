import { Router } from "express";
import { addComment, getCommentsByPost, editComment, deleteComment } from "./comment.controller.js";
import { validateComment } from "../middlewares/validate-comment.js";

const router = Router();

router.post("/", validateComment, addComment);

router.get("/:postId", getCommentsByPost);

router.put("/:commentId", validateComment, editComment);

router.delete("/:commentId", deleteComment);

export default router;
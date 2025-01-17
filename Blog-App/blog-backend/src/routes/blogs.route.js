import { Router } from "express";
import { createBlog, deleteBlog, getByAuthors, getById, getPublished, updateBlog } from "../controllers/blogs.controller.js";
import { requireAuth } from "../middlewares/requireauth.middleware.js";

const BlogRouter = Router();

BlogRouter.route("/").get(getPublished);
BlogRouter.route("/:id").get(requireAuth, getById);
BlogRouter.route("/authors/:authorId").get(requireAuth, getByAuthors);
BlogRouter.route("/").post(requireAuth, createBlog);
BlogRouter.route("/:id").patch(requireAuth, updateBlog);
BlogRouter.route("/:id").delete(requireAuth, deleteBlog);

export default BlogRouter;
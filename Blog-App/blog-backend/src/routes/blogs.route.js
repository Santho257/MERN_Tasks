import { Router } from "express";
import { createBlog, deleteBlog, getByAuthors, getById, getPublished, updateBlog } from "../controllers/blogs.controller.js";

const BlogRouter = Router();

BlogRouter.route("/").post(createBlog);
BlogRouter.route("/").get(getPublished);
BlogRouter.route("/:id").get(getById);
BlogRouter.route("/:id").patch(updateBlog);
BlogRouter.route("/authors/:authorId").get(getByAuthors);
BlogRouter.route("/:id").delete(deleteBlog);

export default BlogRouter;
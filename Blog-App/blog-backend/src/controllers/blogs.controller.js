import Blog from "../models/blogs.model.js";
import { getIdFromToken } from "../services/jwt.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const authorityCheck = async (blogId, userId) => {
    const blog = await Blog.findById(blogId);
    if (!blog)
        throw new ApiError(404, "Blog Not found", { id: `Blog Not found with id :: ${blogId}` });
    else if (blog.author != userId)
        throw new ApiError(403, "Access Denied", { author: `Access denied` })
    return true;
}

const createBlog = asyncHandler(async (req, res, next) => {
    try {
        const { title, content, published = false } = req.body;
        const author = getIdFromToken(req.headers.authorization);
        const newBlog = await Blog.create({ title, content, author, published });
        res.status(201).send(new ApiResponse(201, "Blog Created", newBlog))
    } catch (error) {
        throw error;
    }
});

const getPublished = asyncHandler(async (req, res, next) => {
    try {
        const blogs = await Blog.find({ published: true });
        res.status(200).send(new ApiResponse(200, "All Published Blogs", blogs));
    }
    catch (error) {
        throw error;
    }
});

const getByAuthors = asyncHandler(async(req, res, next) => {
    try{
        const {authorId} = req.params;
        const loggedInUser = getIdFromToken(req.headers.authorization);
        let blogs = [];
        if(authorId == loggedInUser){
            blogs = await Blog.find({ author: authorId });
        }
        else{
            blogs = await Blog.find({ author: authorId, published: true });
        }
        res.status(200).send(new ApiResponse(200, "Blogs By Author", blogs));
    }
    catch(error){
        throw error;
    }
});

const getById = asyncHandler(async(req, res, next) => {
    try{
        const {id} = req.params;
        const loggedInUser = getIdFromToken(req.headers.authorization);
        const blog = await Blog.findById(id);
        if(!blog.published)
            await authorityCheck(id, loggedInUser);
        res.status(200).send(new ApiResponse(200, "Blogs By Author", blog));
    }
    catch(error){
        throw error;
    }
});

const updateBlog = asyncHandler(async (req, res, next) => {
    const author = getIdFromToken(req.headers.authorization);
    const {id} = req.params;
    await authorityCheck(id, author);
    await Blog.findByIdAndUpdate(id, req.body);
    res.status(202).send(new ApiResponse(202, "Updated Successfully", {id}));
})

const deleteBlog = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const author = getIdFromToken(req.headers.authorization);
        await authorityCheck(id, author);
        await Blog.findByIdAndDelete(id);
        res.status(202).send(new ApiResponse(202, "Blog deleted", { id }))
    } catch (error) {
        throw error;
    }
});


export { createBlog, getPublished, deleteBlog, getByAuthors, getById, updateBlog };
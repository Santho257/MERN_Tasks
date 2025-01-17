import { ObjectId } from "bson";
import { model, Schema } from "mongoose";
import Blog from "./blogs.model.js";
import User from "./users.model.js";

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true,
        trim: true
    },
    commentor: {
        type: ObjectId,
        ref: "User",
        required: [true, "Please sign in before commenting"]
    },
    blogId: {
        type: ObjectId,
        ref: "Blog",
        required: [true, "Should comment to a blog"]
    }
}, { timestamps: { createdAt: true } });

CommentSchema.pre("save", async function (next) {
    const commentor = await User.findById(this.commentor);
    if (!commentor)
        next(
            new ApiError(404, "Commentor doesn't Exist", {
                commentor: `Commentor doesn't exist with id :: ${this.commentor}`,
            })
        );
    const blog = await Blog.findById(this.blogId);
    if (!blog)
        next(
            new ApiError(404, "BlogId doesn't Exist", {
                blogId: `Blog doesn't exist with id :: ${this.blogId}`,
            })
        );
    next();
});

const Comment = model("Comment", CommentSchema);

export default Comment;
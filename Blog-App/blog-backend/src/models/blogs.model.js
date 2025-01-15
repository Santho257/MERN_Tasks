import { ObjectId } from "bson";
import { model, Schema } from "mongoose";
import User from "./users.model.js";
import ApiError from "../utils/ApiError";

const BlogSchema = new Schema({
    title: {
        type: String,
        trim: true,
        index: true,
        required: [true, "Title is required"],
    },
    published: {
        type: Boolean,
        default: false,
    },
    content: [
        {
            type: {
                type: "enum",
                trim: true,
                lowercase: true,
                values: ["heading", "para", "image", "quote"],
            },
            value: {
                type: String,
                trim: true,
            },
        },
    ],
    author: {
        type: ObjectId,
        ref: "User",
        required: [true, "Please sign in before writing"],
    },
}, { timestamps: true });

BlogSchema.pre("save", async function (next) {
    const author = await User.findById(this.author);
    if (!author)
        next(
            new ApiError(404, "Author doesn't Exist", {
                author: `Author doesn't exists with id :: ${this.author}`,
            })
        );
    next();
});

BlogSchema.set("toJSON", { virtuals: true });
BlogSchema.set("toObject", { virtuals: true });

BlogSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "blogId",
});

const Blog = model("Blog", BlogSchema);

export default Blog;

import { ObjectId } from "bson";
import { model, Schema } from "mongoose";
import User from "./users.model.js";
import ApiError from "../utils/ApiError.js";

const BlogSchema = new Schema({
    title: {
        type: String,
        trim: true,
        index: true
    },
    published: {
        type: Boolean,
        default: false,
    },
    displayImage: {
        type: String, 
        default: "https://www.ctdatahaven.org/sites/ctdatahaven/themes/ctdatahaven/img/default-blog.png",
    },
    content: [
        {
            type: {
                type: String,
                trim: true,
                lowercase: true,
                enum: {
                    values: ["heading", "para", "image", "quote"],
                    message: "{VALUE} is not a blog component"
                }
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

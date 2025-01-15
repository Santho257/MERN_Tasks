import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { model, Schema } from "mongoose";
import ApiError from "../utils/ApiError.js";

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
        validate: {
            validator: (email) => {
                return /^[a-z\d]([a-z\d]+\.)*[a-z\d]+@([a-z\d]+\.)+[a-z]{2,4}$/.test(
                    email
                );
            },
            message: `{VALUE} is not valid email`,
        },
        required: [true, "Email is required"]
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"]
    },
    avatar: {
        type: String
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password is required"],
        minlength: [6, "Password must be atleast 6 letters"],
    },
}, { timestamps: true });

UserSchema.pre("save", function (next) {
    this.password = hashSync(this.password, genSaltSync(10));
    next();
});

UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });

UserSchema.virtual("myBlogs", {
    ref: "Blog",
    localField: "_id",
    foreignField: "author"
})

UserSchema.statics.login = async function login(email, password) {
    if (!email) {
        throw new ApiError(400, "Email is Required", {
            email: "email is required",
        });
    }
    if (!password) {
        throw new ApiError(400, "Password is required", {
            password: "password is required",
        });
    }
    const user = await this.findOne({ email });
    if (!user)
        throw new ApiError(404, "User not found", {
            email: `${email} doesn't exist`,
        });
    if (!compareSync(password, user.password)) {
        throw new ApiError(400, "Password didn't match", {
            password: `password doesn't match`,
        });
    }
    return user;
};

const User = model("User", UserSchema);

export default User;
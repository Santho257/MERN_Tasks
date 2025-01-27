const { hashSync } = require("bcrypt");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        validate: {
            validator: name => /^[a-zA-Z ]{2,30}$/.test(name),
            message: props => `${props.value} is not a valid name!`
        }
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: (email) => /^[a-z\d]([a-z\d]+\.)*[a-z\d]+@([a-z\d]+\.)+[a-z]{2,4}$/.test(email),
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password),
            message: props => `${props.value} is not a valid password!`
        }
    },
}, { timestamps: true });

userSchema.pre("save", function (next) {
    this.password = hashSync(this.password, genSaltSync(10));
    next();
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

userSchema.virtual("myTaskLists", {
    ref: "TaskList",
    localField: "_id",
    foreignField: "createdBy"
})

export const User = model("User", userSchema);

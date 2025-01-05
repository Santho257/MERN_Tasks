import { model, Schema } from "mongoose";
import { compare, genSaltSync, hashSync } from "bcrypt";
import ApiError from "../utils/ApiError.js";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
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
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minlength: [6, "Password must be atleast 6 letters"],
    },
    theme: {
      type: String,
      uppercase: true,
      trim: true,
      enum: {
        values: ["DARK", "LIGHT"],
        message: "{VALUE} is neither dark nor light",
      },
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  this.password = hashSync(this.password, genSaltSync(10));
  next();
});

UserSchema.virtual("expenseLists", {
  ref: "ExpenseList",
  localField: "_id",
  foreignField: "createdBy",
});

UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });

UserSchema.statics.login = async function login(email, password) {
  if(!email){
    throw new ApiError("Email is required", 400, {
      email: "email is required",
    });
  }
  if(!password){
    throw new ApiError("Password is required", 400, {
      password: "password is required",
    });
  }
  const user = await this.findOne({ email });
  if (!user)
    throw new ApiError("User not found", 400, {
      email: `${email} doesn't exist`,
    });
  if (!(await compare(password, user.password))) {
    throw new ApiError("User not found", 400, {
      password: `password doesn't match`,
    });
  }
  return user;
};

export const User = model("User", UserSchema);

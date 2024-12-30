import { model, Schema } from "mongoose";
import { compare, genSaltSync, hashSync } from "bcrypt";
import ApiError from "../utils/ApiError.js";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
        validate: {
            validator: (email) => {
                return /^[a-z\d]([a-z\d]+\.)*[a-z\d]+@([a-z\d]+\.)+[a-z]{2,4}$/.test(email);
            },
            message: `{VALUE} is not valid email`
        }
    },
    password: {
        type: String,
        minlength: [6, "Password must be atleast 6 letters"]
    },
    theme: {
        type: String,
        uppercase: true,
        enum: {values: ["dark", "light"], message: "{VALUE} is neither dark nor light"}
    }
},{timestamps: true});

UserSchema.pre('validate', function(next){
    this.email = this.email?.trim();
    this.password = this.password?.trim();
    next();
});

UserSchema.pre('save', function(next){
    this.password = hashSync(this.password, genSaltSync(10));
    next();
})

UserSchema.virtual('expenseLists', {
    ref: "ExpenseList",
    localField: "_id",
    foreignField: "createdBy"
});

UserSchema.set("toJSON", {virtuals: true});
UserSchema.set("toObject", {virtuals: true});

UserSchema.statics.login = async function login(email, password) {
    const user = await this.findOne({email});
    if(!user)   throw new ApiError("User not found", 400, {email: "Email doesn't exists"});
    if(!(await compare(password, user.password))){
        throw new ApiError("User not found", 400, {password: `password doesn't match`});
    }
    return user;
}

export const User = model("User", UserSchema);
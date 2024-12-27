import { model, Schema } from "mongoose";
import { genSaltSync, hashSync } from "bcrypt";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, '{VALUE} already exists'],
        index: true,
        lowercase: true,
        validate: {
            validator: (email) => {
                return /^[a-z0-9]([.][a-z0-9]+)*@([a-z0-9_]+[.])+[a-z]{2,4}$/.test(email);
            },
            message: `{value} is not valid email`
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

export const User = model("User", UserSchema);
import mongoose, { model, Schema } from "mongoose";
import { User } from "./users.model.js";
import ApiError from "../utils/ApiError.js";

const ExpenseListSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    createdBy: {
        type: mongoose.ObjectId,
        ref: "User",
        required: [true, "Should have a creator"],
    },
}, { timestamps: true });

ExpenseListSchema.pre('validate', function(next){
    const trimmed = this.title?.trim();
    if(trimmed)
        this.title = trimmed[0].toUpperCase() + trimmed.slice(1);
    next();
});

ExpenseListSchema.pre('save', async function(next){
    const user = await User.findById(this.createdBy);
    if(!user)  next(new ApiError(`${this.createdBy} not exists in User`));
    else next(); 
});

ExpenseListSchema.virtual('expenses', {
    ref: "Expense",
    localField: "_id",
    foreignField: "expenseList"
});

ExpenseListSchema.set("toJSON", { virtuals: true });
ExpenseListSchema.set("toObject", { virtuals: true });

export const ExpenseList = model("ExpenseList", ExpenseListSchema);
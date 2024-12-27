import mongoose, { model, Schema } from "mongoose";

const ExpenseListSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    createdBy: {
        type: mongoose.ObjectId,
        ref: "UserSchema"
    },
}, { timestamps: true });

ExpenseListSchema.virtual('expenses', {
    ref: "Expense",
    localField: "_id",
    foreignField: "expenseList"
});

ExpenseListSchema.set("toJSON", { virtuals: true });
ExpenseListSchema.set("toObject", { virtuals: true });

export const ExpenseList = model("ExpenseList", ExpenseListSchema);
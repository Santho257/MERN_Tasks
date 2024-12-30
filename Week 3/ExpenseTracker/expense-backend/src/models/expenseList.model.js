import mongoose, { model, Schema } from "mongoose";

const ExpenseListSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    createdBy: {
        type: mongoose.ObjectId,
        ref: "UserSchema",
        required: [true, "Should have a creator"],
    },
}, { timestamps: true });

ExpenseListSchema.pre('validate', function(next){
    const trimmed = this.title.trim();
    this.title = trimmed[0].toUpperCase() + trimmed.slice(1);
    next();
})

ExpenseListSchema.virtual('expenses', {
    ref: "Expense",
    localField: "_id",
    foreignField: "expenseList"
});

ExpenseListSchema.set("toJSON", { virtuals: true });
ExpenseListSchema.set("toObject", { virtuals: true });

export const ExpenseList = model("ExpenseList", ExpenseListSchema);
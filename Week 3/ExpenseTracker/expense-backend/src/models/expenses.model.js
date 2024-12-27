import { model, Schema } from 'mongoose';
export const ExpenseSchema = new Schema({
    source: {
        type: String,
        required: [true, "Source cannot be empty"],
    },
    category: {
        type: String,
        uppercase: true,
        enum: {
            values: ["PERSONAL", "TRAVEL", "FOOD", "FAMILY"],
            message: "{VALUE} is not supported"
        },
        required: [true, "Category cannot be empty"],
    },
    date: {
        type: Date,
        required: [true, "Date cannot be empty"],
        get: (date) => date.toISOString(),
        validate: {
            validator: (date) => {
                return date <= new Date()
            },
            message: "Date should be in past"
        }
    },
    amount: {
        type: Number,
        min: [1, "Amount must be greater than zero"],
        required: [true, "Amount cannot be empty"]
    },
    expenseList: {
        type: Schema.Types.ObjectId,
        ref: "ExpenseList",
        required: [true, "Should belong to a list"]
    }
}, { timestamps: true });

ExpenseSchema.pre("save", function (next) {
    this.source = this.source[0].toUpperCase() + this.source.slice(1);
    next();
});

export const Expense = model("Expense", ExpenseSchema);
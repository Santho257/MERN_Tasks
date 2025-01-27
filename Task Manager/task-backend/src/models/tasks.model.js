import { model, Schema } from "mongoose";
import { TaskList } from "./tasklist.model";

const taskSchema = new Schema({
    description: {
        type: String,
        trim: true,
        required: [true, "Description is required"],
        validate: {
            validator: description => /^[a-zA-Z0-9 ]{2,30}$/.test(description),
            message: props => `${props.value} is not a valid description!`
        }
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    deadline: {
        type: Date,
        required: [true, "Deadline is required"]
    },
    completedAt: {
        type: Date
    },
    belongsTo: {
        type: Schema.Types.ObjectId,
        ref: "TaskList",
        required: true
    }
}, { timestamps: true });

taskSchema.pre("save", async function (next) {
    const taskList = await TaskList.findById(this.belongsTo);
    if (!taskList) {
        next(new ApiError(404, "TaskList not found", { belongsTo: `${this.belongsTo} not found` }));
    }
    if (this.status === "completed") {
        this.completedAt = Date.now();
    }
    next();
});

export const Task = model("Task", taskSchema);
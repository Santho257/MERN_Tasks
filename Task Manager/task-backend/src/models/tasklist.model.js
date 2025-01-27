import { model, Schema } from "mongoose";
const taskListSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Title is required"],
        validate: {
            validator: title => /^[a-zA-Z0-9 ]{2,30}$/.test(title),
            message: props => `${props.value} is not a valid title!`
        }
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

taskListSchema.pre("save", async function (next) {
    const user = await User.findById(this.createdBy);
    if (!user) {
        next(new ApiError(404, "User not found", {createdBy: `${this.createdBy} not found`}));
    }
    this.title = this.title[0].toUpperCase() + this.title.slice(1).toLowerCase();
    next();
});

taskListSchema.set("toJSON", { virtuals: true });
taskListSchema.set("toObject", { virtuals: true });

taskListSchema.ObjectIdvirtual("tasks", {
    ref: "Tasks",
    localField: "_id",
    foreignField: "belongsTo"
});

export const TaskList = model("TaskList", taskListSchema);
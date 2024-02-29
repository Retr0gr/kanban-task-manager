const mongoose = require("mongoose");


const TaskSchema = new mongoose.Schema({
    column: {
        type: String,
        default: "Backlog"
    },
    value: {
        type: String,
    },
    isEditing: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Task", TaskSchema);
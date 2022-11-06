const mongoose= require("mongoose");
const todoSchema= new mongoose.Schema({
    activity: {
        type: String, required: true
    },
    user: {
        type: String,
        ref: "User"
    }
})
const Todo= mongoose.model("Todo", todoSchema);
module.exports = Todo;
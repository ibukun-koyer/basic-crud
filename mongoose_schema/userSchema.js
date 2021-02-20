//creating a mongodb scheme
const mongoose = require("mongoose");


const user = new mongoose.Schema({
    name: String,
    id: String,
    grade: Number
});

//exporting the model to our server
module.exports.user = mongoose.model("User", user)


const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:[3, "Name should have minimum 3 characters"],
        maxLength:[16, "Name shouldn't exceed 16 characters"],
        required:[true, "Enter your name"]
    },
    email:{
        type:String,
        required:[true, "Enter your email"],
        validate:[validator.isEmail, "Please enter a valid email"]
    },
    password:String,
});

module.exports = mongoose.model('user', userSchema);
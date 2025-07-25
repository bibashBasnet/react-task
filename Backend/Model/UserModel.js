const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
        unique: false
    }
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);

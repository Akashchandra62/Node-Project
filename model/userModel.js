const mongoose = require("mongoose")

const user = new mongoose.Schema({
    name : {
        type:String
    },
    email : {
        type:String
    },
    mobile : {
        type : Number
    },
    password : {
        type:String
    }
})

const User = mongoose.model("user", user);
module.exports = User;
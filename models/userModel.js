const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user_name : String,
    image : String,
    approved : {
        type : Boolean,
        default : false
    },
    block_status : {
        type : Boolean ,
        default : false
    },
    email : String,
    password : String
});

module.exports = mongoose.model("user" , userSchema);

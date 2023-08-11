const  mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    blogTitle : String,
    description : String,
    image : String,
    category : {
        ref : "category",
        type : mongoose.Schema.Types.ObjectId,
    },
    user : {
        ref : "user",
        type : mongoose.Schema.Types.ObjectId,
    },
    read_time : String,
    blogContent : []
},{
    timestamps : true
});

module.exports = mongoose.model("blog" , blogSchema);


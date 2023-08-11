const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    icon : String,
});

module.exports = mongoose.model("category" , categorySchema);


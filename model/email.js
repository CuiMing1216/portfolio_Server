var mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true},
    msg:{type:String, default:null}
});

module.exports = mongoose.model('email', EmailSchema);
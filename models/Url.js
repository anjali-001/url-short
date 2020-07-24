const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    userid:{
        type:String
    },
    hash:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('URL',urlSchema);

const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL:{
        type: String,
        requiresd: true,
    },
    visitHistory:[{
        timeStamp:{type:Number}
    }],
},{timeStamp:true}
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
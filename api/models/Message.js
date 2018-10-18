const mongoose = require('mongoose')

const Message = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { 
        _id: String, 
        name: String 
    },
    text: { type: String, require: true, },
    createdAt: { type: Date, require: true, },
    relation_id: mongoose.Schema.Types.ObjectId,
})
module.exports = mongoose.model('Message', Message)
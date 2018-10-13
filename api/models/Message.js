const mongoose = require('mongoose')

const Message = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { _id, name: String },
    text: { type: String, require: true, },
    createdAt: { type: Date, require: true, },
    relation_id: { type: Number, require: true, },
})
module.exports = mongoose.model('Message', Message)
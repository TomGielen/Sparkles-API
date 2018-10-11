const mongoose = require('mongoose')

const Message = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: { type: String, require: true, },
    message: { type: String, require: true, },
    date_send: { type: Date, require: true, },
    relation_id: { type: Number, require: true, },
})
module.exports = mongoose.model('Message', Message)
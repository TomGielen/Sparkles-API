const mongoose = require('mongoose')

const Message = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: String, require: true, },
    user_name: { type: String, require: true, },
    user: {
        id: { type: String, require: true, },
        name: { type: String, require: true, },
        avatar: { type: String, require: false, default: 'linktoimage' },
    },
    text: { type: String, require: true, },
    createdAt: { type: Date, require: true, },
    relation_id: mongoose.Schema.Types.ObjectId,
})
module.exports = mongoose.model('Message', Message)
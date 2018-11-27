const mongoose = require('mongoose')
const message = require('./Message')

const Relation = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true, },
    second_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true, },
    start_date: { type: Date, require: true, },
    progress: { type: Number, require: true, default: 0 },
    status: { type: String, require: true },
    messages: { type: [], ref: 'Message' }
})
module.exports = mongoose.model('Relation', Relation)
 
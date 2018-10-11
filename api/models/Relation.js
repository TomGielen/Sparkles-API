const mongoose = require('mongoose')

const Relation = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_user_id: { type: mongoose.Schema.Types.ObjectId, require: true, },
    second_user_id: { type: mongoose.Schema.Types.ObjectId, require: true, },
    start_date: { type: Date, require: true, },
    progress: { type: Number, require: true, },
    status: { type: String, require: true, }
})
module.exports = mongoose.model('Relation', Relation)
 
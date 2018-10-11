const mongoose = require('mongoose')

const User = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    personal_details_id: mongoose.Schema.Types.ObjectId,
    interest_id: mongoose.Schema.Types.ObjectId,
    device_id: { type: String, require: true, unique: true },
    sex: { type: String, require: true, lowercase: true },
    preference: { type: String, require: true, lowercase: true },
    userImage: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    searching_spark: { type: Boolean, require: true, default: true },
    succes_rate: { type: Number, require: true, default: 80 },
    language: { type: String, require: true, default: 'dutch', lowercase: true }
})
module.exports = mongoose.model('User', User)

// add creation_date
// add date of birth

// if the date of birth known then create age_range example : 
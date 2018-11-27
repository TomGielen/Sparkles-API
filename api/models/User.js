const mongoose = require('mongoose')

const User = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    personal_details_id: mongoose.Schema.Types.ObjectId,
    interest_id: mongoose.Schema.Types.ObjectId,
    creation_date: { type: Date, require: true },
    device_id: { type: String, require: true, unique: true },
    gender: { type: String, require: true, lowercase: true, enum:['male', 'female'] },
    preference: { type: String, require: true, lowercase: true, enum:['male', 'female'] },
    firstName: { type: String, require: true },
    userImage: { type: String, require: true },
    date_of_birth: { type: Date, require: true },
    lastName: { type: String, require: true, default: 'your_lastname' },
    status: { type: String, require: true, default: 'no_relation', enum:['searching', 'in_relation', 'no_relation'] },
    succes_rate: { type: Number, require: true, default: 80 },
    language: { type: String, require: true, default: 'dutch', lowercase: true },
})
module.exports = mongoose.model('User', User)

// userImage: { type: String, require: true },

// if the date of birth known then create age_range example : 
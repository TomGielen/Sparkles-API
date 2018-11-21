const User = require('../models/User');
const Relation = require('../models/Relation');
const mongoose = require('mongoose');

exports.create_match = (req, res, next) => {
    const preference = req.params.preference;
    const language = req.params.language;
    const user_id = req.params.user_id;
    const newRelationId = new mongoose.Types.ObjectId();

    User.find()
        .where('_id').ne(user_id)
        .where('status').equals('searching')
        .where('language', language)
        .where('gender', preference)
        .select('firstName _id')
        .exec()
        .then(users => {
            console.log(users)
            if (users < 1) {
                User.update({ _id: user_id }, {
                    $set: {
                        status: 'searching',
                    }
                }).exec()
                    .then(result => {
                        res.status(200).json({
                            confirmation: 'No match found searching for match...',
                            data: result
                        })
                    })
            } else {
                console.log('func 2222')
                // create relation
                const relation = new Relation({
                    _id: newRelationId,
                    first_user_id: user_id,
                    second_user_id: users[0],
                    start_date: new Date(),
                    status: 'active'
                })
                relation.save().then(result => {
                    // update the founded match
                    User.update({ _id: users[0]._id }, {
                        $set: {
                            status: 'in_relation',
                        }
                    }).exec()

                    res.status(200).json({
                        confirmation: 'match found and created new relation',
                        data: relation._id
                    })
                }).then(() => {
                    // update the current user 
                    User.update({ _id: user_id }, {
                        $set: {
                            status: 'in_relation',
                        }
                    }).exec()
                })
            }
        })
        .catch(err => {
            res.json({
                confirmation: 'failed',
                data: err.message
            })
        })

}

//const preference = req.params.preference;

    // // check where search_spark === true & language === same_as_input & preference === same_as_input 
    // // .then
    // // create new relation with both ID's
    // // set both user.search_spark to false
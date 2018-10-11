const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');


exports.user_getAll = (req, res, next) => {
	User.find()
	.select('_id personal_details_id interest_id firstName lastName device_id sex preference userImage') // define what lines you should see in the response object
	.exec()
	.then(docs => {
		const response = {
			count: docs.length,
			users: docs.map(doc => { // structure the output of the response and add it the way tom en me like <3
				return {
					_id: doc._id,
					personal_details_id: doc.personal_details_id,
					interest_id: doc.interest_id,
					firstName: doc.firstName,
					lastName: doc.lastName,
					device_id: doc.device_id,
					sex: doc.sex,
					preference: doc.preference,
					userImage: doc.userImage,
					request: {
						type: 'get',
						description: 'GET_THIS_USER',
						url: 'http://localhost:3000/user/' + doc._id,
					}
				}
			})
		}
		res.status(200).json(response)
	})
	.catch(err => {
		res.status(500).json({
			error: err
		})
	})
}

exports.user_signup = (req, res, next) => {
	console.log(req.file)
	User.find({ device_id: req.body.device_id }).exec()
		.then(user => {
			if (user.length >= 1) {
				res.status(409).json({
					message: 'phone is already in our database, you cant create multiple account'
				})
			} else {
				const user = new User({
					_id: new mongoose.Types.ObjectId(),
					personal_details_id: new mongoose.Types.ObjectId(),
					interest_id: new mongoose.Types.ObjectId(),
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					device_id: req.body.device_id,
					sex: req.body.sex,
					preference: req.body.preference,
					userImage: req.file.path
				})
				user.save()
					.then(result => {
						console.log(result)
						res.status(201).json({
							User: result
							// request: {
							// 	type: 'GET personal ',
							// 	description: 'GET_THIS_MESSAGES',
							// 	url: 'http://localhost:3000/message/' + result._id,
							// }
						})
					})
					.catch(err => {
						console.log(err)
						res.status(500).json({
							error: err
						})
					})
			}
		})
}

exports.user_login = (req, res, next) => {
	User.find({ device_id: req.body.device_id })
		.exec()
		.then(user => {
			console.log("de usertttttt " + user[0]);
			if (user.length < 1) {
				return res.status(401).json({
					message: 'auth failed!!',
				});
			}
			if (user[0].lastName == req.body.lastName) {
				const token = jwt.sign({
					lastName: user[0].lastName,
					userId: user[0]._id
				},
					process.env.JWT_KEY,
					{
						expiresIn: "1h",
					},

				)
				return res.status(200).json({
					message: 'auth successfull',
					token: token
				});
			}
			res.status(401).json({
				message: 'auth failed',
			});
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				error: err
			})
		})
}

exports.user_delete = (req, res, next) => {
	User.remove({ _id: req.params.userId })
		.exec()
		.then(result => {
			res.status(201).json({
				message: 'user deleted'
			})
		}).catch(err => {
			console.log(err)
			res.status(500).json({
				error: err
			})
		})
}

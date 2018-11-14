const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');
const hardcoded = {
	JWT_KEY: "abradolf"
}


exports.user_getAll = (req, res, next) => {
	User.find()
		.select(`_id personal_details_id interest_id firstName lastName device_id gender preference userImage status succes_rate language `) // define what lines you should see in the response object
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
						gender: doc.gender,
						preference: doc.preference,
						userImage: doc.userImage,
						status: doc.status,
						succes_rate: doc.succes_rate,
						language: doc.language,
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

exports.user_byId = (req, res, next) => {
	User.findById(req.params.userId)
		.select(`_id personal_details_id interest_id firstName lastName device_id gender preference userImage status succes_rate language `) // define what lines you should see in the response object
		.exec()
		.then(doc => {
			res.status(200).json({
				_id: doc._id,
				personal_details_id: doc.personal_details_id,
				interest_id: doc.interest_id,
				firstName: doc.firstName,
				lastName: doc.lastName,
				device_id: doc.device_id,
				gender: doc.gender,
				preference: doc.preference,
				userImage: doc.userImage,
				status: doc.status,
				succes_rate: doc.succes_rate,
				language: doc.language,
			})
		})
		.catch(err => {
			res.status(500).json({
				error: err
			})
		})
}

exports.user_getUserImage = (req, res, next) => {
	const id = req.params.userId;
	User.findById(id)
		.select(`userImage `) // define what lines you should see in the response object
		.exec()
		.then(image => {
			res.status(200).json({
				message: 'image of user' + id,
				image: image
			})
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
					creation_date: new Date(),
					firstName: req.body.firstName,
					device_id: req.body.device_id,
					date_of_birth: req.body.date_of_birth,
					gender: req.body.gender,
					preference: req.body.preference,
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


	// date_of_birth: req.body.date_of_birth,
	// userImage: req.file.path

exports.user_login = (req, res, next) => {

	User.find({ device_id: req.body.device_id })
		.exec()
		.then(user => {
			if (user[0].lastName == req.body.lastName) {
				const token = jwt.sign({
					lastName: user[0].lastName,
					userId: user[0]._id
				},
					hardcoded.JWT_KEY,
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
				message: 'auth failed2',
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

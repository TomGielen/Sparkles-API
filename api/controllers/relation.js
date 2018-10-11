const Message = require('../models/Message')
const Relation = require('../models/Relation');
const mongoose = require('mongoose');


exports.relation_get_all = (req, res, next) => {

    Relation.find()
        .exec()
		.then(relation => {
			res.status(200).json({
				confirmation: 'gelukt',
				data: relation
			})
		})
		.catch(err => {
			res.json({
				confirmation: 'mislukt',
				data: err.message
			})
		})
}

exports.relation_create = (req, res, next) => {
	// template of item to store
	const relation = new Relation({
		_id: new mongoose.Types.ObjectId(),
		first_user_id: req.body.first_user_id,
		second_user_id: req.body.second_user_id,
		start_date: new Date(),
		progress: req.body.progress,
		status: req.body.status
	})

	relation.save()
		.then(result => {
			res.status(201).json({
				message: 'Added relation succesfully!',
				relation: result
			})
		})
		.catch(err => {
			res.status(500).json({
				error: err
			})
		});
}

exports.relation_delete = (req, res, next) => {
	const id = req.params.relation_id

	Relation.remove({ _id: id })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'relation deleted!'
			})
		})
		.catch(err => {
			res.status(500).json({ error: err })
		})
}

exports.relation_update = (req, res, next) => {
	const id = req.params.relation_id
	const updateOps = {}

	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value
	}

	Relation.update({ _id: id }, { $set: updateOps })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'relation updated!',
				result: result
			 })
		})
		.catch(err => {
			res.status(500).json({ error: err })
		})
}

exports.relation_messages = (req, res, next) => {
	const relation_id = req.params.relation_id;

	Message.find({ relation_id: relation_id })
        .sort('date_send')
        .exec()
		.then(relation => {
			res.status(200).json({
				confirmation: 'gelukt',
				data: relation
			})
		})
		.catch(err => {
			res.json({
				confirmation: 'mislukt',
				data: err.message
			})
		})
}

exports.relation_active = (req, res, next) => {
	const user_id = req.params.user_id;

	Relation.find()
		.or([{ first_user_id: user_id }, { second_user_id: user_id }])
		.where('status', 'active')
		//.select('relation_id') // define what lines you should see in the response object
		.exec()
		.then(relation => {
			res.status(200).json({
				confirmation: 'gelukt',
				data: relation
			})
		})
		.catch(err => {
			res.json({
				confirmation: 'mislukt',
				data: err.message
			})
		})
}

exports.relation_passed = (req, res, next) => {
	const user_id = req.params.user_id;

	Relation.find()
		.or([{ first_user_id: user_id }, { second_user_id: user_id }])
		.where('status', 'passed')
		//.select('relation_id') // define what lines you should see in the response object
		.exec()
		.then(relation => {
			res.status(200).json({
				confirmation: 'gelukt',
				data: relation
			})
		})
		.catch(err => {
			res.json({
				confirmation: 'mislukt',
				data: err.message
			})
		})
}


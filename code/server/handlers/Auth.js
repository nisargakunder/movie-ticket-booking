let mongoose = require('mongoose')
const UserModel = require('./../models/User')
const crypto = require('crypto')

const handleLogin = function (req, res) {
	let data = req.body

	UserModel.find({}, function (err, users) {
		console.log(users)
	})

	res.send({ token: '123' })
}

const handleSignup = function (req, res) {
	let data = req.body

	let token = crypto.randomBytes(16).toString('hex')
	var new_user = new UserModel({
		name: data.name,
		email: data.email,
		mobileNumber: data.mobileNumber,
		username: data.username,
		password: data.password,
		token: token
	})

	new_user.save(function (err, result) {
		if (err) {
			console.log(err)
		} else {
			res.send({ token: token })
		}
	})
}

const handleLogout = function (req, res) {
	res.send({})
}

const handleGetUsers = function (req, res) {
	UserModel.find({}, function (err, users) {
		res.send({ users: users })
	})
}

module.exports = {
	handleLogin,
	handleSignup,
	handleLogout,
	handleGetUsers
}

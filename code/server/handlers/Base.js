let mongoose = require('mongoose')

let MovieModel = require('../models/Movie')
let TheaterModel = require('../models/Theater')
let MovieTheaterTimeModel = require('../models/MovieTheaterTime')
let UserMovieMapModel = require('../models/UserMovieMap')

const handleGetMovies = function (req, res) {
	MovieModel.find({}, function (err, movies) {
		res.send({ movies: movies })
	})
}

const handleGetTheaters = function (req, res) {
	TheaterModel.find({}, function (err, theaters) {
		res.send({ theaters: theaters })
	})
}

const handleGetMovieTheaterShows = function (req, res) {
	MovieTheaterTimeModel.find({}, function (err, movieTheaterShowList) {
		res.send({ movieTheaterShowList: movieTheaterShowList })
	})
}

const handleSaveTicket = function (req, res) {}

const handleGetTickets = function (req, res) {
	UserMovieMapModel.find({}, function (err, movies) {
		res.send({ users: users })
	})
}

module.exports = {
	handleGetMovies,
	handleGetTheaters,
	handleGetMovieTheaterShows,
	handleSaveTicket,
	handleGetTickets
}

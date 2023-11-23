let mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserMovieSchema = new Schema({
	id: {
		type: String,
		default: ''
	},

	userId: {
		type: String,
		default: ''
	},

	movieId: {
		type: String,
		default: ''
	},

	theaterId: {
		type: String,
		default: ''
	},

	seatInfo: {
		type: Object,
		default: {}
	},

	createdAt: {
		type: Date,
		default: Date.now
	}
})

UserMovieSchema.set('collection', 'userMovie')

module.exports = mongoose.model('UserMovies', UserMovieSchema)

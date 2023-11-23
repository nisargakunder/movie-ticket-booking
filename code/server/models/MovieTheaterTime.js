let mongoose = require('mongoose')

var Schema = mongoose.Schema

var MovieTheatersMapSchema = new Schema({
	id: {
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

	showTimes: {
		type: Object,
		default: []
	},

	createdAt: {
		type: Date,
		default: Date.now
	}
})

MovieTheatersMapSchema.set('collection', 'movieTheatersMap')

module.exports = mongoose.model('movieTheatersMap', MovieTheatersMapSchema)

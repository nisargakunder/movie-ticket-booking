let mongoose = require('mongoose')

var Schema = mongoose.Schema

var TheaterSchema = new Schema({
	id: {
		type: String,
		default: ''
	},

	name: {
		type: String,
		default: ''
	},

	createdAt: {
		type: Date,
		default: Date.now
	}
})

TheaterSchema.set('collection', 'theater')

module.exports = mongoose.model('Theaters', TheaterSchema)

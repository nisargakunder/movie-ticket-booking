let mongoose = require('mongoose')

var Schema = mongoose.Schema

var MovieSchema = new Schema({
	id: {
		type: String,
		default: ''
	},

	name: {
		type: String,
		default: ''
	},

	description: {
		type: String,
		default: ''
	},

	rating: {
		type: String,
		default: ''
	},

	price: {
		type: Number,
		default: 0
	},

	image: {
		type: String,
		default: ''
	},

	createdAt: {
		type: Date,
		default: Date.now
	}
})

MovieSchema.set('collection', 'movies')

module.exports = mongoose.model('movie', MovieSchema)

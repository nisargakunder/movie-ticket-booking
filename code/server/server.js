const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const routes = require('./routes')
var cors = require('cors')

app.use(cors())
let mongoose = require('mongoose')

var jsonParser = bodyParser.json() // create application/json parser
app.use(jsonParser)
urlencodedParser = bodyParser.urlencoded({
	extended: false
}) // create application/x-www-form-urlencoded parser
app.use(urlencodedParser)

routes(app)

const server = '127.0.0.1:27017' // REPLACE WITH YOUR DB SERVER
const database = 'moviedb' // REPLACE WITH YOUR DB NAME

app.listen('3001', () => {
	console.log('Movie Server started:')
	mongoose
		.connect(`mongodb://${server}/${database}`)
		.then(() => {
			console.log('Database connection successful')
		})
		.catch((err) => {
			console.error('Database connection error')
		})
})

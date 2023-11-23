const AuthHandler = require('./../handlers/Auth')
const BaseHandler = require('./../handlers/Base')

// const authMiddleware = require('./middleware/Auth')

module.exports = function (app) {
	app.get('/', (req, res) => {
		res.send({})
	})

	app.post('/login', AuthHandler.handleLogin)
	app.post('/signup', AuthHandler.handleSignup)
	app.get('/logout', AuthHandler.handleLogout)

	// app.get('/users', authMiddleware.user.ensureAuthenticated, AuthHandler.handleGetUsers)

	app.get(
		'/movies', //authMiddleware.user.ensureAuthenticated,
		BaseHandler.handleGetMovies
	)
	app.get(
		'/theaters',
		//authMiddleware.user.ensureAuthenticated,
		BaseHandler.handleGetTheaters
	)
	app.get('/movie-theater-time', BaseHandler.handleGetMovieTheaterShows)
	// app.post('/ticket', authMiddleware.user.ensureAuthenticated, BaseHandler.handleSaveTicket)
	// app.get('/tickets', authMiddleware.user.ensureAuthenticated, BaseHandler.handleGetTickets)
}

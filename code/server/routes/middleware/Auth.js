exports.user = {
	ensureAuthenticated: function (req, res, next) {
		UserModel.findOne({
			username: req.body.userid
		}).exec(function (err, user) {
			if (err) {
				res.status(400).send('We are facing some issues at the moment.')
				return
			}

			if (!user) {
				res.status(401).json({
					status: 'un-authorized',
					message: 'Incorrect user name'
				})
				return
			}

			var authToken = req.headers['authorization'] || req.headers['Authorization']
			if (user && user.accesstoken !== authToken) {
				res.status(401).json({
					status: 'un-authorized',
					message: 'Your session has expired'
				})
				return
			}

			req.userInfo = user

			next()
		})
	}
}

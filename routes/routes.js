// User model
var User = require('../model/user');

module.exports = function(app) {
	// app.get('*', function(req, res, next) {
	// 	req.session.message = null;
	// 	next();
	// });

	// Home
	app.get('/', function(req, res) {
		res.render('index', {
			title: 'Home'
		});
	});

	// Sign up
	app.get('/signup', function(req, res) {
		res.render('signup', {
			title: 'Sign up'
		});
	});

	// Sign up function
	app.post('/signup', function(req, res) {
		var newUser = new User({
			email: req.body.email,
			password: req.body.password
		});

		User.get(newUser.email, function(err, user) {
			if (err) {
				// req.flash('error', 'System error.');
				req.session.message = 'System error.';
				return res.redirect('/signup');
			}
			if (user) {
				// req.flash('error', 'Email is already exists.');
				req.session.message = 'Email is already exists.';
				return res.redirect('/signup');
			}
			newUser.save(function(err) {
				if (err) {
					// req.flash('error', err);
					req.session.message = err;
					return res.redirect('/signup');
				}
				req.session.user = newUser;
				// req.flash('success', 'Signup successfully.');
				req.session.message = 'Signup successfully.';
				res.redirect('/profile');
			});
		});
	});

	// Login
	app.get('/login', function(req, res) {
		res.render('login', {
			title: 'Login'
		});
	});

	// Login function
	app.post('/login', function(req, res) {
		User.get(req.body.email, function(err, user) {			
			if (!user) {
				// req.flash('error', 'Account does not exist.');
				req.session.message = 'Login error.';
				return res.redirect('/login');
			}
			if (user.password != req.body.password) {
				req.session.message = 'Login error.';
				res.redirect('/login');
			}
			if (user.password == req.body.password) {
				req.session.user = user;
				// req.flash('success', 'Login successfully.');
				req.session.message = 'Login successfully.';
				res.redirect('/profile');
			}
		});
	});

	// Logout
	app.get('/logout', function(req, res) {
		req.session.user = null;
		// req.flash('success', 'Logout successfully.');
		req.session.message = 'Logout successfully.';
		res.redirect('/');
	});

	// Profile
	app.get('/profile', function(req, res) {
		res.render('profile', {
			title: 'Profile'
		});
	});
};
var express = require('express');
var routes = require('./routes/routes');

var config = require('./config/config');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(express);

var app = express();
var port = process.env.PORT || 3000;

app.configure(function() {
	app.set('view engine', 'ejs');
	app.use(express.cookieParser()); 
	app.use(express.bodyParser()); // = urlencoded() + json() + multipart()
	app.use(express.session({
		secret: config.cookieSecret,
		store: new MongoStore({
			db: config.db.name
		})
	}));
	// Easily save messages in session
	// app.use(flash());
	// Automatically transmit variables to .ejs views
	app.use(function(req, res, next){
		res.locals.msg = req.session.message? req.session.message: '';
		res.locals.session = req.session;
		next();
	});
});

// Routes all paths
routes(app);

// Start the server
app.listen(port);
console.log('Listening on port ' + port);
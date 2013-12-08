var config = require('../config/config');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db(
	config.db.name,
	new Server(
		config.db.host,
		Connection.DEFAULT_PORT,
		{}
	),
	{
		safe:true
	}
);
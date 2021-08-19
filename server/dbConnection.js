const mongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const mongoDbUrl =
	'mongodb+srv://' +
	process.env.ATLAS_USER +
	':' +
	process.env.ATLAS_PASS +
	'@pursuit-of-trivia.udq8q.mongodb.net/' +
	process.env.ATLAS_DB +
	'?retryWrites=true&w=majority';

let mongodb;

function connect(callback) {
	mongoClient.connect(mongoDbUrl, (err, db) => {
		mongodb = db;
		callback();
	});
}
function get() {
	let database = process.env.ATLAS_DB;

	if (process.env.NODE_ENV == 'development') {
		database = process.env.ATLAS_DB_DEV;
	}

	if (process.env.NODE_ENV == 'test') {
		database = process.env.ATLAS_DB_TEST;
	}

	return mongodb.db(database);
}

function close() {
	mongodb.close();
}

module.exports = {
	connect,
	get,
	close,
};

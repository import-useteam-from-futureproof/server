const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri =
	'mongodb+srv://' +
	process.env.ATLAS_USER +
	':' +
	process.env.ATLAS_PASS +
	'@pursuit-of-trivia.udq8q.mongodb.net/' +
	process.env.ATLAS_DB +
	'?retryWrites=true&w=majority';

const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const init = async () => {
	let database = process.env.ATLAS_DB;

	if (process.env.NODE_ENV == 'development') {
		database = process.env.ATLAS_DB_DEV;
	}

	if (process.env.NODE_ENV == 'test') {
		database = process.env.ATLAS_DB_TEST;
	}

	try {
		// Connect to the MongoDB cluster
		let client = await mongoClient.connect();
		return client.db(database);
	} catch (e) {
		console.error(e);
	}
};

const close = async () => {
	try {
		mongoClient.close();
	} catch (err) {
		console.log(err);
	}
};

module.exports = { init, close };

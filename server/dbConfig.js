const { MongoClient } = require('mongodb');
require('dotenv').config();

const init = async () => {
	const uri =
		'mongodb+srv://' +
		process.env.ATLAS_USER +
		':' +
		process.env.ATLAS_PASS +
		'@pursuit-of-trivia.udq8q.mongodb.net/' +
		process.env.ATLAS_DB +
		'?retryWrites=true&w=majority';

	const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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

module.exports = { init };

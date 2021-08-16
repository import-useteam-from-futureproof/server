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

	try {
		// Connect to the MongoDB cluster
		let client = await mongoClient.connect();
		return client.db(process.env.ATLAS_DB);
	} catch (e) {
		console.error(e);
	}
};

module.exports = { init };

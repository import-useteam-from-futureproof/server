const { init } = require('../../dbConfig');

const request = require('supertest');
const app = require('../../app');

// enable resetting of db between tests
const resetTestDB = () => {
	return new Promise(async (res, rej) => {
		try {
			const db = await init();

			await db.collection('rooms').drop();
			await db.collection('users').drop();

			await db.collection('rooms').insertOne({
				name: 'test room 2',
				owner: 3,
				max_room_size: 2,
				public_room: true,
				entry_pass: '',
			});
			await db.collection('users').insertOne({
				firebase_id: '3',
				username: 'test',
			});
			res('Test DB reset');
		} catch (err) {
			rej(`Could not reset TestDB: ${err}`);
		}
	});
};

global.init = init;
global.request = request;
global.app = app;
global.port = process.env.PORT || 3000;
global.resetTestDB = resetTestDB;

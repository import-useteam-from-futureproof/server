const { init } = require('../../dbConfig');

const request = require('supertest');
const app = require('../../app');

// enable resetting of db between tests
const resetTestDB = () => {
	return new Promise(async (res, rej) => {
		try {
			const db = await init();
			// const roomLength = await db.collection('rooms').find().toArray().length;
			// const userLength = await db.collection('users').find().toArray().length;
			// if (roomLength > 0) {
			// 	await db.collection('rooms').drop();
			// }
			// if (userLength > 0) {
			// 	await db.collection('users').drop();
			// }
			await db.collection('rooms').drop();
			await db.collection('users').drop();

			await db.collection('rooms').insertOne({
				name: 'test room 2',
				owner: 3,
				max_room_size: 2,
				public_room: true,
				entry_pass: '',
			});
			await db.collection('users').insertMany([
				{
					firebase_id: '3',
					username: 'test',
				},
				{
					firebase_id: '5',
					username: 'test2',
				},
			]);
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

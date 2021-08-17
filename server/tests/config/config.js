const { init } = require('../../dbConfig');

const request = require('supertest');
const app = require('../../app');

// enable resetting of db between tests
const resetTestDB = () => {
	return new Promise(async (res, rej) => {
		try {
			const db = await init();

			const allRooms = await db.collection('rooms').find().toArray();
			const allUsers = await db.collection('users').find().toArray();
			const allQuizzes = await db.collection('quizzes').find().toArray();
			if (allRooms.length > 0) {
				await db.collection('rooms').drop();
			}
			if (allUsers.length > 0) {
				await db.collection('users').drop();
			}
			if (allQuizzes.length > 0) {
				await db.collection('quizzes').drop();
			}

			await db.collection('rooms').insertOne({
				name: 'test room 2',
				owner: 3,
				max_room_size: 2,
				public_room: true,
				entry_pass: '',
			});
			// await db.createCollection('quiz');
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

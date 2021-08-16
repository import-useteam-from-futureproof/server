const { init } = require('../dbConfig');
const { ObjectId } = require('mongodb');

class Quiz {
	constructor(data) {
		this.id = data.id;
		this.room_id = data.room_id;
		this.scores = data.scores;
	}

	static findById(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const db = await init();
				let quizData = await db
					.collection('quizzes')
					.find({ _id: ObjectId(id) })
					.toArray();
				let quiz = new Quiz({ ...quizData[0], id: quizData[0]._id });
				resolve(quiz);
			} catch (err) {
				reject('Quiz not found');
			}
		});
	}

	static create(room_id) {
		return new Promise(async (resolve, reject) => {
			let scores = [];
			try {
				const db = await init();
				let quizData = await db.collection('quizzes').insertOne({
					room_id,
					scores,
				});
				console.log(quizData);
				// let newRoom = new Room(roomData.ops[0]);
				// console.log(newRoom);
				resolve(quizData.insertedId);
			} catch (err) {
				reject('Error creating quiz');
			}
		});
	}

	static update(id, scores) {
		return new Promise(async (resolve, reject) => {
			try {
				const db = await init();
				let scoreData = await db
					.collection('quizzes')
					.findOneAndUpdate(
						{ _id: ObjectId(id) },
						{ $set: { scores: scores } },
						{ returnOriginal: false }
					);

				resolve();
			} catch (err) {
				console.log(err);
				reject('Error updating scores');
			}
		});
	}
}

module.exports = Quiz;

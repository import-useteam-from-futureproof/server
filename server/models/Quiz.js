const { init } = require('../dbConfig');
const { ObjectId } = require('mongodb');

class Quiz {
	constructor(data) {
		this.id = data.id;
		this.room_id = data.room_id;
		this.category = data.category;
		this.difficulty = data.difficulty;
		this.questions = data.questions;
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

	static create(room_id, quiz_data) {
		return new Promise(async (resolve, reject) => {
			let scores = [];
			try {
				const db = await init();
				let quizData = await db.collection('quizzes').insertOne({
					room_id,
					category: quiz_data.topic,
					difficulty: quiz_data.difficulty,
					questions: quiz_data.questions,
					scores,
				});
				resolve(quizData.insertedId);
			} catch (err) {
				reject('Error creating quiz');
			}
		});
	}

	// static group() {
	// 	return new Promise(async (resolve, reject) => {
	// 		try {
	// 			const db = await init();
	// 			resolve(quizData);
	// 		} catch (err) {
	// 			console.log(err);
	// 			reject('Error creating quiz');
	// 		}
	// 	});
	// }

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

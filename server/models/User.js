//const { init } = require('../dbConfig');
//const { ObjectId } = require('mongodb');
const db = require('../dbConnection');

class User {
	constructor(data) {
		this.id = data._id;
		this.firebase_id = data.firebase_id;
		this.username = data.username;
		this.avatar_url = data.avatar_url;
		this.high_score = data.high_score;
	}

	static create(firebase_id, username) {
		return new Promise(async (resolve, reject) => {
			try {
				//const db = await init();

				const user = await db.get().collection('users').findOne({ username: username });
				if (user) {
					throw new Error('Username already in use');
				}

				let userData = await db
					.get()
					.collection('users')
					.insertOne({
						firebase_id,
						username,
						avatar_url: `https://avatars.dicebear.com/api/bottts/${username}.svg`,
					});

				resolve({ _id: userData.insertedId });
			} catch (err) {
				reject(`${err}`);
			}
		});
	}

	static findById(id) {
		return new Promise(async (resolve, reject) => {
			try {
				//const db = await init();
				let userData = await db.get().collection('users').findOne({ firebase_id: id });
				let user = new User({ ...userData, id: userData._id });

				resolve(user);
			} catch (err) {
				reject('User not found');
			}
		});
	}

	update(avatar_url) {
		return new Promise(async (resolve, reject) => {
			try {
				//const db = await init();
				const filter = { firebase_id: this.id };
				const update = { $set: { avatar_url: avatar_url } };
				const updatedUserData = await db
					.get()
					.collection('users')
					.findOneAndUpdate(filter, update, { returnDocument: 'after' });
				const updatedUser = new User({ ...updatedUserData.value, id: updatedUserData._id });

				resolve(updatedUser);
			} catch (err) {
				reject('Error updating user');
			}
		});
	}

	updateHighScore(score) {
		return new Promise(async (resolve, reject) => {
			try {
				//const db = await init();

				const filter = { _id: this.id };
				const userToCheck = await db.get().collection('users').findOne(filter);

				if (userToCheck.high_score > score) {
					throw new Error('Score is too low, High Score remains unchanged');
				}

				const update = { $set: { high_score: score } };
				const updatedUserData = await db
					.get()
					.collection('users')
					.findOneAndUpdate(filter, update, { returnDocument: 'after' });
				const updatedUser = new User({ ...updatedUserData.value, id: updatedUserData._id });

				resolve(updatedUser);
			} catch (err) {
				reject(`${err}`);
			}
		});
	}

	destroy() {
		return new Promise(async (resolve, reject) => {
			try {
				//const db = await init();
				const result = await db.get().collection('users').deleteOne({ _id: this.id });

				resolve(`User ${result.username} was deleted`);
			} catch (err) {
				reject('User could not be deleted');
			}
		});
	}

	static allScores() {
		return new Promise(async (resolve, reject) => {
			try {
				//const db = await init();
				const users = await db.get().collection('users').find({}).toArray();
				const usersFiltered = users
					.filter((user) => {
						return user.high_score !== undefined;
					})
					.map(({ username, high_score }) => {
						return {
							username,
							high_score,
						};
					})
					.sort((a, b) => {
						if (b.high_score < a.high_score) {
							return -1;
						}
						if (b.high_score > a.high_score) {
							return 1;
						} else {
							return 0;
						}
					})
					.slice(0, 20);

				resolve(usersFiltered);
			} catch (err) {
				reject(`${err}`);
			}
		});
	}
}

module.exports = User;

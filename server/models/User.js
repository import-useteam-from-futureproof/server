const { init } = require('../dbConfig');
//const { ObjectId } = require('mongodb');

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
				const db = await init();

				const user = await db.collection('users').findOne({ username: username });
				if (user) {
					throw new Error('Username already in use');
				}

				let userData = await db.collection('users').insertOne({
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
				const db = await init();
				let userData = await db.collection('users').findOne({ firebase_id: id });
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
				const db = await init();
				const filter = { firebase_id: this.id };
				const update = { $set: { avatar_url: avatar_url } };
				const updatedUserData = await db
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
				const db = await init();

				const filter = { _id: this.id };
				const userToCheck = await db.collection('users').findOne(filter);
				console.log(userToCheck);

				if (userToCheck.high_score > score) {
					throw new Error('Score is too low, High Score remains unchanged');
				}

				const update = { $set: { high_score: score } };
				const updatedUserData = await db
					.collection('users')
					.findOneAndUpdate(filter, update, { returnDocument: 'after' });
				const updatedUser = new User({ ...updatedUserData.value, id: updatedUserData._id });
				resolve(updatedUser);
			} catch (err) {
				reject(`${err}`);
			}
		});
	}

	static allScores() {
		return new Promise(async (resolve, reject) => {
			try {
				const db = await init();
				// const all = await db.collection('users')
				const users = await db
					.collection('users')
					.find(
						{ high_score: { $ne: null } },
						{ username: 1, high_score: 1, _id: 0, firebase_id: 0 }
					)
					.toArray();
				console.log(users);
			} catch (err) {
				reject(`${err}`);
			}
		});
	}
}

module.exports = User;

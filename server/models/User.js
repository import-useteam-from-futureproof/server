const { init } = require('../dbConfig');
const { ObjectId } = require('mongodb');

class User {
	constructor(data) {
		this.id = data.id;
		this.name = data.name;
		this.avatar_url = data.avatar_url;
	}

	static create(user_id, username, avatar_url) {
		return new Promise(async (resolve, reject) => {
			try {
				const db = await init();
				let userData = await db.collection('users').insertOne({
					_id: user_id,
					username,
					avatar_url,
				});
				resolve(userData.insertedId);
			} catch (err) {
				reject('Error creating user');
			}
		});
	}

	static findById(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const db = await init();
				let userData = await db.collection('users').find({ _id: id }).toArray();
				console.log(userData);
				let user = new User({ ...userData[0], id: userData[0]._id });
				console.log(user);
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
				const filter = { _id: this.id };
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
}

module.exports = User;

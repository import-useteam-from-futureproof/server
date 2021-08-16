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
					user_id,
					username,
					avatar_url,
				});
				//let newRoom = new Room(roomData.ops[0]);
				resolve(ObjectId(userData.insertedId));
			} catch (err) {
				reject('Error creating user');
			}
		});
	}
}

module.exports = User;

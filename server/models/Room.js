const { init } = require('../dbConfig');
const { ObjectId } = require('mongodb');

class Room {
	constructor(data) {
		this.id = data.id;
		this.name = data.name;
		this.owner = data.owner;
		this.max_room_size = data.max_room_size;
		this.public_room = data.public_room;
		this.entry_pass = data.entry_pass;
	}

	static get all() {
		return new Promise(async (resolve, reject) => {
			try {
				const db = await init();
				const roomData = await db.collection('rooms').find().toArray();
				const rooms = roomData.map((r) => new Room({ ...r, id: r._id }));
				resolve(rooms);
			} catch (err) {
				console.log(err);
				reject('Error retrieving rooms');
			}
		});
	}

	static findById(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const db = await init();
				let roomData = await db
					.collection('rooms')
					.find({ _id: ObjectId(id) })
					.toArray();
				let room = new Room({ ...roomData[0], id: roomData[0]._id });
				resolve(room);
			} catch (err) {
				reject('Room not found');
			}
		});
	}

	static create(name, owner, max_room_size, public_room, entry_pass) {
		return new Promise(async (resolve, reject) => {
			try {
				const db = await init();
				let roomData = await db.collection('rooms').insertOne({
					name,
					owner,
					max_room_size,
					public_room,
					entry_pass,
				});

				resolve(roomData.insertedId);
			} catch (err) {
				reject('Error creating room');
			}
		});
	}
}

module.exports = Room;

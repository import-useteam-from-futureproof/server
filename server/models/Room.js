//const { init } = require('../dbConfig');
const db = require('../dbConnection');
const { ObjectId } = require('mongodb');

class Room {
	constructor(data) {
		this.id = data.id;
		this.name = data.name;
		this.owner = data.owner;
		this.max_room_size = data.max_room_size;
		this.public_room = data.public_room;
		this.entry_pass = data.entry_pass;
		this.participants = data.participants;
		this.quizzes = data.quizzes;
	}

	static get all() {
		return new Promise(async (resolve, reject) => {
			try {
				//const db = await init();
				const roomData = await db.get().collection('rooms').find({}).toArray();
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
				//const db = await init();
				let roomData = await db
					.get()
					.collection('rooms')
					.find({ _id: ObjectId(id) })
					.toArray();
				let room = new Room({ ...roomData[0], id: roomData[0]._id });

				resolve(room);
			} catch (err) {
				reject(`Room not found: ${err}`);
			}
		});
	}

	static create(name, owner, max_room_size, public_room, entry_pass) {
		return new Promise(async (resolve, reject) => {
			try {
				//const db = await init();
				let roomData = await db
					.get()
					.collection('rooms')
					.insertOne({
						name,
						owner,
						max_room_size,
						public_room,
						entry_pass,
						participants: [
							{
								user: owner,
							},
						],
					});

				const dataToSend = await db
					.get()
					.collection('rooms')
					.findOne({ _id: ObjectId(roomData.insertedId) });

				resolve(dataToSend);
			} catch (err) {
				reject('Error creating room');
			}
		});
	}

	join(userId) {
		return new Promise(async (resolve, reject) => {
			try {
				//const db = await init();
				let room = await db.get().collection('rooms').findOne({ _id: this.id });

				if (room.max_room_size <= room.participants.length) {
					throw new Error('Room at max capacity');
				}

				const participants = room.participants;
				participants.push({ user: userId });

				let updateRoom = await db
					.get()
					.collection('rooms')
					.updateOne({ _id: this.id }, { $set: { participants: participants } });

				resolve(updateRoom);
			} catch (err) {
				reject('Error joining room');
			}
		});
	}

	leave(userId) {
		return new Promise(async (resolve, reject) => {
			try {
				//const db = await init();
				let room = await db.get().collection('rooms').findOne({ _id: this.id });

				const participants = room.participants.filter(function (obj) {
					return obj.user !== userId;
				});

				let updateRoom = await db
					.get()
					.collection('rooms')
					.updateOne({ _id: this.id }, { $set: { participants: participants } });

				resolve(updateRoom);
			} catch (err) {
				reject('Error leaving room');
			}
		});
	}

	addQuiz(quizId) {
		return new Promise(async (resolve, reject) => {
			try {
				let quizzes = [];
				//const db = await init();
				let room = await db.get().collection('rooms').findOne({ _id: this.id });

				if (room.quizzes) {
					quizzes = room.quizzes;
				}
				quizzes.push(quizId);

				await db
					.get()
					.collection('rooms')
					.updateOne({ _id: this.id }, { $set: { quizzes: quizzes } });

				resolve('Quiz successfully added to the Room');
			} catch (err) {
				reject('Error adding Quiz');
			}
		});
	}
}

module.exports = Room;

const express = require('express');
const router = express.Router();

const Room = require('../models/Room');

router.get('/', async (req, res) => {
	try {
		const rooms = await Room.all;
		res.status(200).json({ rooms });
	} catch (err) {
		res.status(404).json({ err });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const room = await Room.findById(req.params.id);
		res.status(200).json(room);
	} catch (err) {
		res.status(404).json({ err });
	}
});

router.post('/', async (req, res) => {
	try {
		const room = await Room.create(
			req.body.name,
			req.body.owner,
			req.body.max_room_size,
			req.body.public_room,
			req.body.entry_pass
		);
		res.status(201).json(room);
	} catch (err) {
		res.status(500).json({ err });
	}
});

router.post('/:id/join/:userid', async (req, res) => {
	try {
		const room = await Room.findById(req.params.id);
		const joinRoom = await room.join(req.params.userid);
		res.status(204).json(joinRoom);
	} catch (err) {
		res.status(500).json({ err });
	}
});

router.post('/:id/leave/:userid', async (req, res) => {
	try {
		const room = await Room.findById(req.params.id);
		const joinRoom = await room.leave(req.params.userid);
		res.status(204).json(joinRoom);
	} catch (err) {
		res.status(500).json({ err });
	}
});

module.exports = router;

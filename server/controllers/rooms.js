const express = require('express');
const router = express.Router();

const Room = require('../models/Room');

router.get('/', async (req, res) => {
	try {
		const rooms = await Room.all;
		res.json({ rooms });
	} catch (err) {
		res.status(500).json({ err });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const room = await Room.findById(req.params.id);
		res.json(room);
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
		res.status(404).json({ err });
	}
});

module.exports = router;

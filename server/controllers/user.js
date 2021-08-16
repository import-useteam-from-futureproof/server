const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.json(user);
	} catch (err) {
		res.status(404).json({ err });
	}
});

router.post('/', async (req, res) => {
	try {
		const user = await User.create(req.body.firebase_id, req.body.username);
		res.status(201).json(user);
	} catch (err) {
		res.status(500).json({ err });
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const updatedUser = await user.update(req.body.avatar_url);
		res.status(200).json({ user: updatedUser });
	} catch (err) {
		res.status(500).json({ err });
	}
});

router.patch('/:id/highscore/:score', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const updatedUser = await user.updateHighScore(req.params.score);
		res.status(200).json({ user: updatedUser });
	} catch (err) {
		res.status(500).json({ err });
	}
});

module.exports = router;

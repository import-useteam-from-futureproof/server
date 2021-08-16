const express = require('express');
const router = express.Router();

const Quiz = require('../models/Quiz');

router.get('/:id', async (req, res) => {
	try {
		const quiz = await Quiz.findById(req.params.id);
		res.json(quiz);
	} catch (err) {
		res.status(404).json({ err });
	}
});

router.get('/', async (req, res) => {
	try {
		const quiz = await Quiz.group();
	} catch (err) {
		res.status(404).json({ err });
	}
});

router.post('/', async (req, res) => {
	try {
		const quiz = await Quiz.create(req.body.room_id);
		res.status(201).json(quiz);
	} catch (err) {
		res.status(404).json({ err });
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const quiz = await Quiz.update(req.params.id, req.body.scores);
		res.status(204).json(quiz);
	} catch (err) {
		res.status(404).json({ err });
	}
});

module.exports = router;

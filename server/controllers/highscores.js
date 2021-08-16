const express = require('express');
const router = express.Router();

const Quiz = require('../models/Quiz');

router.get('/', async (req, res) => {
	try {
		const scores = await Quiz.group();
		res.json(scores);
	} catch (err) {
		res.status(404).json({ err });
	}
});

module.exports = router;

const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/', async (req, res) => {
	try {
		const scores = await User.allScores();
		res.status(200).json(scores);
	} catch (err) {
		res.status(404).json({ err });
	}
});

module.exports = router;

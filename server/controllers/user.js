const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/', async (req, res) => {
	try {
		const user = await User.create(req.body.id, req.body.username, req.body.avatar_url);
		res.status(201).json(user);
	} catch (err) {
		res.status(404).json({ err });
	}
});

module.exports = router;

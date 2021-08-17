const express = require('express');
const router = express.Router();

const Quiz = require('../models/Quiz');
const axios = require('axios');

router.get('/:id', async (req, res) => {
	try {
		const quiz = await Quiz.findById(req.params.id);
		res.json(quiz);
	} catch (err) {
		res.status(404).json({ err });
	}
});

router.post('/', async (req, res) => {
	try {
		const url = `https://opentdb.com/api.php?amount=${req.body.num_questions}&category=${req.body.category}&difficulty=${req.body.difficulty}&type=multiple`;
		const { data } = await axios.get(url);

		const quizData = {
			topic: data.results[0].category,
			difficulty: data.results[0].difficulty,
			questions: data.results.map((question) => {
				return {
					question: question.question,
					correct_answer: question.correct_answer,
					incorrect_answers: question.incorrect_answers,
				};
			}),
		};

		const quiz = await Quiz.create(req.body.room_id, quizData);
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

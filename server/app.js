const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

const roomRoutes = require('./controllers/rooms');
const userRoutes = require('./controllers/user');
const quizRoutes = require('./controllers/quizzes');
const highscoreRoutes = require('./controllers/highscores');
server.use('/rooms', roomRoutes);
server.use('/user', userRoutes);
server.use('/quiz', quizRoutes);
server.use('/highscores', highscoreRoutes);

server.get('/', (req, res) => {
	res.status(200).send({ message: 'Hello world!' });
});

module.exports = server;

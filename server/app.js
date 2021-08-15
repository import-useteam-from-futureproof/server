const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
	res.status(200).send({ message: 'Hello world!' });
});

module.exports = app;

const app = require('./app');
const db = require('./dbConnection');

const PORT = process.env.PORT || 5000;

db.connect(() => {
	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`);
	});
});

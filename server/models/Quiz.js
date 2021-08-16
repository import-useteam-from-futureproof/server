const { init } = require('../dbConfig');
const { ObjectId } = require('mongodb');

class Quiz {
    
	constructor(data) {
		this.id = data.id;
        this.scores = data.scores;
    }

}

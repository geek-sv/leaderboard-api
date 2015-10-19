var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
	title: String,
	description: String,
	genre: {
		type: String, enum:
		['Action','Shooter', 'Adventure','Role-Playing','Board Game','Sports']
	}
});

var Game = mongoose.model('game', gameSchema);

module.exports = Game;
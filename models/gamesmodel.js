var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
	title: String,
	description: String,
	genre: String
});

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;
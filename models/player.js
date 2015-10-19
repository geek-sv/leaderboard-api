var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	age: Number,
	country: String
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;
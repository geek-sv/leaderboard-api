var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	age: Integer,
	country: String,
	games: [{type:Schema.ObjectId, ref:"Game"}]
	
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;
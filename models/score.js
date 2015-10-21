//SCORE MODEL
var mongoose = require('mongoose');

var scoreSchema = mongoose.Schema({
	scored: Number,
	player: {type: mongoose.Schema.ObjectId, ref:"Player"},
	game: {type: mongoose.Schema.ObjectId, ref :"Game"},
	date: {type: Date, default: Date.now}
});

var Score = mongoose.model('Scores', scoreSchema);


module.exports = Score;
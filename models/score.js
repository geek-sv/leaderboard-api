var mongoose = require('mongoose');

var scoreSchema = mongoose.Schema({
	scored: Integer,
	player: {type: Schema.ObjectId, ref:"Player"},
	game: {type: Schema.ObjectId, ref :"Game"},
	date: Date
});

var Score = mongoose.model('Scores', scoreSchema);

module.exports = Score;
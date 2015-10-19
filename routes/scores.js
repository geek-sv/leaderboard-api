var express = require('express');
var router = express.Router();
var Score = require('../models/score')

// GET score  listing. 
router.get('/', function(req, res, next) {
  res.send('scores');
}); 

router.get('/newscore', function(req,res){
	res.render('newscore', {title:'New Score'});
});

// save New Player
router.post('/newscore', function(req,res,next){
	var scored = new Score({
		player: req.body.playerid,
		game: req.body.gameid,
		scored: req.body.score,
	});

	scored.save(function(err, scored){
		if(err)
			return res.send(500, err.message);
		res.status(200).jsonp(scored);
		console.log(req.body);
		//console.log('done!')
	})


});


module.exports = router;
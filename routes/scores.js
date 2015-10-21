var express = require('express');
var router = express.Router();
var Score = require('../models/score');
var middleware = require('../auth/middleware.js');

// GET score  listing. 
router.get('/', function(req, res, next) {
  res.send('scores');
}); 

router.get('/newscore', middleware.ensureAuthenticatedAdmin, function(req,res){
	res.render('newscore', {title:'New Score'});
});

// save New Player
router.post('/newscore', middleware.ensureAuthenticatedAdmin, function(req,res,next){
	var scored = new Score({
		player: req.body.playerid,
		game: req.body.gameid,
		scored: req.body.score,
	});

	scored.save(function(err, scored){
		if(err)
			return res.send(500, err.message);
		res.status(200).send(scored);
	})


});


module.exports = router;
var express = require('express');
var router = express.Router();
var Score = require('../models/score');
var middleware = require('../auth/middleware.js');

// GET score  listing. 
router.get('/', function(req, res, next) {
  res.send('scores');
}); 

router.get('/newscore', middleware.ensureAuthenticatedFull, function(req,res){
	res.render('newscore', {title:'New Score'});
});

// save New Player
router.post('/newscore', middleware.ensureAuthenticatedFull, function(req,res,next){
	if(JSON.stringify(req.body) === '{}'){
		res.send(500, 'request doesnt have parameters');
	}else{
	var scored = new Score({
		player: req.body.playerid,
		game: req.body.gameid,
		scored: req.body.score,
	});

	scored.save(function(err, scored){
		if(err)
			return res.send(500, err.message);
		res.send(scored);
	});

}
});


module.exports = router;
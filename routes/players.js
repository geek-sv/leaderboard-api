var express = require('express');
var router = express.Router();
var Player = require('../models/player');
var Score = require('../models/score');
var Game = require('../models/games');
var countries = require('../public/javascripts/countries.json');

/* GET s listing. */
router.get('/', function(req, res, next) {
  res.send('players');
});

//GET New player form
router.get('/newplayer', function(req,res,next){
	res.render('newplayer',{title:'New Player', json:countries});
});

// save New Player
router.post('/newplayer', function(req,res,next){
	var player = new Player({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		age: req.body.age,
		country: req.body.country
	});

	player.save(function(err, player){
		if(err)
			return res.send(500, err.message);
		res.status(200).jsonp(player);
		console.log(req.body);
		//console.log('done!')
	})


});

//GET player list with details 

router.get('/playerlist', function(req,res){
	Player.find({},{},function(err, player){
		if(err) 
			res.send(500, err.message);
		console.log('GET/gamelist');
		//Show json response
		//res.status(200).jsonp(games);
		res.send(player);
	});
});

router.get('/playergamelist/:id', function(req,res,next){
	
	Score.find({'player':req.params.id}, function(err, score){
		Player.populate(score, {path:'player',select:'firstname lastname'},function(err,score){
			Game.populate(score, {path:'game', select:'title'}, function(err, score){
			res.status(200).send(score);
		});
		});
		
	});
	/*Score.find({'player': req.params.id},{}, function(err, score){
		if(err)
			res.send(500, err.message);
		res.send(score);
	});*/
});



module.exports = router;
var express = require('express');
var router = express.Router();
var Game = require('../models/games');


// GET games  listing. 
router.get('/', function(req, res, next) {
  res.render('games', { title:'Games'});
});

//GET new game form
router.get('/newgame', function(req,res,next){
	res.render('newgame',{title:'New Game'});
});

//Save new game in DB
router.post('/newgame', function(req,res){
	var game = new Game({
		title: req.body.gametitle,
		description: req.body.gamedescription,
		genre: req.body.gamegenre
	});

	game.save(function(err, game){
		if(err)
			return res.send(500, err.message);
		res.status(200).jsonp(game);
		console.log(req.body);
		//console.log('done!')
	})
});

//GET game list 

router.get('/gamelist', function(req,res){
	Game.find({}, '_id title description',function(err, games){
		if(err) 
			res.send(500, err.message);
		console.log('GET/gamelist');
		//Show json response
		//res.status(200).jsonp(games);
		res.send(games);
	});
});

// GET a specific game

router.get('/:id', function(req,res){
	Game.findById(req.params.id, function(err, game){
		if(err) 
			return res.send(500, err.message);
		console.log('GET /'+req.params.id);
		//Show json response
		//res.status(200).jsonp(game);
		//res.send(game);
		res.send(game);
	});
});


module.exports = router;

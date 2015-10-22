var express = require('express');
var router = express.Router();
var Game = require('../models/games');
var middleware = require('../auth/middleware.js');

// GET games  listing. 
router.get('/', function(req, res, next) {
  res.render('games', { title:'Games'});
});

//GET new game form
router.get('/newgame',middleware.ensureAuthenticatedFull, function(req,res,next){
	res.render('newgame',{title:'New Game'});
});

//Save new game in DB
router.post('/newgame',middleware.ensureAuthenticatedFull, function(req,res){
	if(JSON.stringify(req.params) === '{}'){
		res.send(500, 'request doesnt have parameters');
	}else{

	var game = new Game({
		title: req.body.gametitle,
		description: req.body.gamedescription,
		genre: req.body.gamegenre
	});

	game.save(function(err, game){
		if(err)
			return res.send(500, err.message);
		res.send(game);
		console.log(req.body);
	})
}});

//GET game list 

router.get('/gamelist',middleware.ensureAuthenticatedRead, function(req,res){
	Game.find({}, '_id title description',function(err, games){
		if(err) 
			res.send(500, err.message);
		console.log('GET/gamelist');
		res.send(games);
	});
});

// GET a specific game

router.get('/:id', function(req,res){
	Game.findById(req.params.id, function(err, game){
		if(err) 
			return res.send(500, err.message);
		res.send(game);
	});
});


module.exports = router;

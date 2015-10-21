var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Player = require('../models/player');
var Score = require('../models/score');
var Game = require('../models/games');
var countries = require('../public/javascripts/countries.json');
var ObjectId = require('mongoose').Types.ObjectId;
var middleware = require('../auth/middleware.js');

/* GET s listing. */
router.get('/', function(req, res, next) {
  res.send('players');
});

//GET New player form
router.get('/newplayer',middleware.ensureAuthenticatedAdmin, function(req,res,next){
	res.render('newplayer',{title:'New Player', json:countries});
});

// save New Player
router.post('/newplayer',middleware.ensureAuthenticatedAdmin, function(req,res,next){
	var player = new Player({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		age: req.body.age,
		country: req.body.country
	});

	player.save(function(err, player){
		if(err)
			return res.send(500, err.message);
		res.status(200).send(player);
	})


});

//GET player list with details 

router.get('/playerlist', middleware.ensureAuthenticatedFull, function(req,res){
	Player.find({},{},function(err, player){
		if(err) 
			res.send(500, err.message);
		//Show json response
		res.status(200).send(player);
	});
});


//Show game's list for a specific player
router.get('/playergamelist/:id',middleware.ensureAuthenticatedFull, function(req,res,next){
	var id = new ObjectId(req.params.id);

	Score.aggregate([
		{
			$match:{'player':id}
		},{
			$group:{_id: '$game'}
		},{
			$project:{game:"$_id",_id:0}
		}]).exec(function(err,result){
			Game.populate(result, {path:'game'}, function(err, game){
				res.status(200).send(game);
			});
	});
});



module.exports = router;
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
var Score = require('../models/score');
var Game = require('../models/games');
var Player = require('../models/player');
var moment = require('moment');

// GET leaderboard for a specifyc game
router.get('/:gameid/:start/:end', function(req,res,next){
		var id =new ObjectId(req.params.gameid);
		var string = '{\''+req.params.gameid +'\' : hola}'
	
		var start = moment.utc(req.params.start, "YYYYMMDD");
		var end = moment.utc(req.params.end,"YYYYMMDD").add({'hours':23,'minutes':59,'seconds':59});
		console.log(start.format());
	Score.aggregate([
		{
			$match:{ $and:[{'game':id},
					{'date':{ $gte:new Date(start.format()), $lte: new Date(end.format())}}
			]}
		},
		{
			$group:{
				_id:'$player',
				points:{$sum:'$scored'}
			}
		},{
			$project:{_id: 0, player:"$_id", points:1 }
		},{
			$sort:{_id: 1, points: -1}
		}]).exec(function(err,result){
			Player.populate(result, {
				path:'player', select: 'firstname lastname'
			},function(err,player){
				res.send(player);
		});
	});


});

module.exports = router;



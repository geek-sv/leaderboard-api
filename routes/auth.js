//GENERATE ACCESS TOKEN FOR CLIENT APPLICATION AND ADMIN APPLICATION

var express = require('express');
var router= express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User= require('../models/user');
var config = require('../config/config.json');



router.get('/', function(req, res){
	res.render('login', {title:'Login'});
});


router.post('/auth', function(req,res){
	//Find the user
	User.findOne({
		username:req.body.username
	}, function(err, user){
		if(err){
			return res.send(500, err.message);
		}
		if(!user){
			res.send(500, 'User not found');
		}else if(user){
			//check password
				console.log(user.password);
			bcrypt.compare(req.body.password, user.password, function(err,isMatch){
				if(!isMatch){
					res.send(500, 'Incorrect Password');
				}else{
				//Generate Token
					if(user.role == 'client'){
						var token = jwt.sign(
							user.role, 
							config.phraseclient,
							{
								expiresInMinutes: 43200
							});
							res.send(token);	
					}else{
						var token = jwt.sign(
							user.role, 
							config.phraseadmin,
							{
								expiresInMinutes: 43200
							});
							res.send(token);
					}
				
				}
			});
					
		} 
			
	});

});

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/login');
});

module.exports= router;
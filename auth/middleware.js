var jwt = require('jsonwebtoken');
var config = require('../config/config.json');

exports.ensureAuthenticatedFull = function(req,res,next){
	if(!req.headers.authorization){
		return res.send(403,'Request doesnt have headers');
	}

	var token = req.headers.authorization;

	        jwt.verify(token, config.phraseclient, function(err, decoded){
            if(err){
            	jwt.verify(token,config.phraseadmin,function(err,decodec){
            		if(err){
            			res.send(500,'Invalid Token');
            	}else{
            		res.decoded = decoded;
            		next();
            	}	
            		
            	});
            }else{
            	res.decoded = decoded; 
            	next();
        	}
        });
    } 

exports.ensureAuthenticatedAdmin = function(req,res,next){
	if(!req.headers.authorization){
		return res.send(403,'Request doesnt have headers');
	}

	var token = req.headers.authorization;

	        jwt.verify(token, config.phraseadmin, function(err, decoded){
            if(err){ 
            	res.send(500,'Invalid Token');
            }else{
            	req.decoded = decoded; 
            	next();
        	}
        });
    }


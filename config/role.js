var User = require('../models/user');

var user = new User({
	username:'client',
	email:'client@client.com',
	password:'clientpass',
	role:'client'
});

user.save(function(err,user){
	if(err){
		console.log(err);
	}else{
		console.log('Seeded user');
	}
});

var admin = new User({
	username:'admin',
	email:'admin@admin.com',
	password:'adminpass',
	role:'admin'
});

admin.save(function(err,admin){
	if(err){
		console.log(err);
	}else{
		console.log('Seeded admin');
	}
});


var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
	username:{ 
		type: String,
		required: true,
		unique: true
	},
	email:{
		type: String,
		require: true,
		unique: true
	},
	password:{
		type:String,
		required: true
	},
	 role:{
	 	type: String,
	 	required: true,
	 	enum:['client','admin']
	 }

});

userSchema.pre('save',function(next){
	//check if this a new password
	if(!this.isModified('password')){
		return next();
	}
	//initialize encryption
	var user = this;
	bcrypt.genSalt(10, function(err, salt){
		if(err){
			return next(err);
		}

		//succesful salt value
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err){
				return next(err);
			}

			//succesful encrypted password
			user.password = hash;
			next();
		});
	});
});

var User=mongoose.model('user', userSchema);

module.exports = User;
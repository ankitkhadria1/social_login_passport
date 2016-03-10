var passport = require('passport');
 var User = require('../models/user.js');
 module.exports = function()
 {
 	passport.serializeUser(function(user,done)
 	{
 		done(null,user.id);
 	});

 	passport.deserializeUser(function(id,done)
 	{
 		user.findById(id,function(err,user)
 		{
 			done(err,user);
 		});
 	});

 };
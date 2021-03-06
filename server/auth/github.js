

var GitHubStrategy = require('passport-github').Strategy;
var passport = require('passport');
var User = require('../models/user.js');
var config = require('../_config');
var init = require('./init');


passport.use(new GitHubStrategy({
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {


      return done(null, profile);
    // var searchQuery = {
    //   name: profile.displayName 
    // };

    // var updates = {
    //   name: profile.displayName,
    //   someID: profile.id
    // };

    // var options = {
    //   upsert: true
    // };

    // // update the user if s/he exists or add a new user
    // User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
    //   if(err) {
    //     return done(err);
    //   } else {
    //     return done(null, user);
    //   }
    // });
  }

));

// serialize user into the session
init();


module.exports = passport;

var express = require('express');
var router = express.Router();
var passportGithub = require('../auth/github');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',function(req,res,next)
{
	res.send("back and register");
})


router.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
    console.log(req.user);
  });
module.exports=passportGithub;
module.exports = router;

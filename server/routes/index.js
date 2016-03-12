var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var passportGithub = require('../auth/github');
console.log("you are in routing file");
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', login : 'please login'});
});

router.get('/login',function(req,res,next)
{
	res.send("back and register");
})
router.get('/auth/github', passportGithub.authenticate('github'));
	
	var client = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '' ,
  database: 'test'
});

// router.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

// router.get('/auth/github/callback',
//   passportGithub.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication
//     console.log("successful login!!!");
//    res.redirect('index',{ title : 'welcome to github'});
//     res.json(req.user);
//     console.log(req.user);
//   });


router.get('/auth/github/callback',
passportGithub.authenticate('github', { failureRedirect: '/' }),
function(req, res) {
	var html = JSON.stringify(req.user, null, 4)
	// console.log("individual is"+html.displayName[1]);
	var json = JSON.parse(html);
	// console.log(html);
	var url  =json._json.repos_url;
	var photo = json._json.avatar_url;
	var email = json._json.email;
	var username = json.username;
	var gitId = json.id;
 var TABLE = "github";
 // client.connect();
 	console.log('select id from github where gitId='+gitId);
  client.query('select id from github where gitId=?' ,[gitId],
function(err, result, fields) {
    if (err) throw err;
    if(result!='')
    {
    	console.log("Dfd");
    }
    else
    {
    	 var sql= 'insert into '+ TABLE +' (username , email, imgUrl,gitId) values ("' +username +'","'+email+'","'+photo+'","'+gitId+'")';
    	 client.query(sql);
    }
});
    res.render('index',{ title:json.displayName , login :'successful login',repo:url,img:photo });
// var html = "<ul>\
// <li><a href='/auth/github'>GitHub</a></li>\
// <li><a href='/logout'>logout</a></li>\
// </ul>";
// // dump the user for debugging
// if (req.isAuthenticated()) {
// html += "<p>authenticated as user:</p>"
// html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
// }
// res.send(html);
});


router.get('/', function (req, res) {
var html = "<ul>\
<li><a href='/auth/github'>GitHub</a></li>\
<li><a href='/logout'>logout</a></li>\
</ul>";
// dump the user for debugging
if (req.isAuthenticated()) {
html += "<p>authenticated as user:</p>"
html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
}
res.send(html);
});
router.get('/logout', function(req, res){
console.log('logging out');
req.logout();
res.redirect('/');
});
// Simple route middleware to ensure user is authenticated.
// Use this route middleware on any resource that needs to be protected. If
// the request is authenticated (typically via a persistent login session),
// the request will proceed. Otherwise, the user will be redirected to the
// login page.
function ensureAuthenticated(req, res, next) {
if (req.isAuthenticated()) { return next(); }
res.redirect('/')
}
router.get('/protected', ensureAuthenticated, function(req, res) {
res.send("acess granted");
}); 	
module.exports=passportGithub;
module.exports = router;

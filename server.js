// Our holy server ...
var express = require('express');
var morgan = require('morgan');
var bodyParser=require('body-parser');
var path = require('path')
var user = require("./db/db.js"); // Our user database
var car = require("./db/carDB.js") // Our car database
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var app = express();
var session = require("express-session");


app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb'}));
app.use(session({secret : "session"}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/'));

// This variable will tell the app if there's anyone logged in.
var logged = false;

// This variable will hold the information of the logged in user.
// check line 110 ..
var userlogged = []

// This get will start at the beginning to bring all the data from the cars database
app.get('/data',function(req, res){
  car.find({}, function(err,data){
  	// Pushing the logged in variable with the data
	data.push(logged ,userlogged);
	// Sending data to the front end.
	res.json(data);
  });
});

// The logIn post handling ..
app.post("/logIn",function(req,res){
	// Looking for the username ..
	user.findOne({username: req.body.user}, function(err, user){
		if (!user){ 
			res.send('Wrong UserName !');
		} else {
			// If found compare his password
			bcrypt.compare(req.body.password, user.password, function(err, hash){
				if(hash){
					// If matched begin a session ..
					req.session.regenerate(function(data) {
						// and assign him as logged.
						console.log(user)
						logged = true;
						userlogged.push(user.username, user.phone)
						res.end()
       						});

				} else {res.send('Worng Password !!');}

			});

		}	
	});	
});

// The logOut handling get.
app.get('/logout', function(req, res) {
/*	 Eliminate the session ..
	 hasta la vista BB ...
                        ______
                      <((((((\\\
                      /      . }\
                      ;--..--._|}
   (\                 '--/\--'  )
    \\                | '-'  :'|
     \\               . -==- .-|
      \\               \.__.'   \--._
      [\\          __.--|       //  _/'--.
      \ \\       .'-._ ('-----'/ __/      \
       \ \\     /   __>|      | '--.       |
        \ \\   |   \   |     /    /       /
         \ '\ /     \  |     |  _/       /
          \  \       \ |     | /        /
           \  \      \        /
*/
	req.session.destroy(function() {
		// Assign him as a quieter.
		logged = false;
		userlogged = [];
		res.end();
	});
});

// Don't go Senpai ..
// ༼ つ ಥ_ಥ ༽つ

// Please continue ..

// Our sign up post handler ..
app.post("/signUp",function(req,res){
	// hashing the password ..
	userlogged.push(req.body.name, req.body.numberPhon)
	bcrypt.hash(req.body.password, null, null, function(err, hash){
		// saving private {{req.body.name}} ..
		var userr = new user ({
			username: req.body.name,
			password: hash,
			phone: req.body.numberPhon,
			email: req.body.email });
// sorry, it's line 125 .
		userr.save(function(err, userr){
			if (err){
				console.log(err);
			};
		});
	});
	// Assigning him as a logger ...
	logged = true;
	res.end();
});

// Our add new car handler ..
app.post("/add",function(req,res){
	// saving the new car ..
	// oops!, check line 54 maybe ? ¯\_(ツ)_/¯
	var carr = new car ({
		username: req.body.username,
		phone: req.body.phone,
		type: req.body.type,
		color: req.body.color,
		price: req.body.price,
		image: req.body.image
	});
  carr.save(function(err, carr){
		if (err){
			console.log(err)
		};
	});
	res.end();
});

// Our wormHole ..
var port = process.env.PORT || 5000;
/*			 
        ________________________________         
       /                                "-_          
      /      .  |  .                       \          
     /      : \ | / :                       \         
    /        '-___-'                         \      
   /_________________________________________ \      
        _______| |________________________--""-L 
       /       F J                              \ 
      /       F   J                              L
     /      :'     ':                            F
    /        '-___-'                            / 
   /_________________________________________--"  
*/

// Start listening ...
app.listen(port, function() {

console.log("	   *   '*");
console.log("              *");
console.log("                   *");
console.log("                           *");
console.log("                  *");
console.log("                         *");
console.log(`you are now connected to:  ${port}`);
});

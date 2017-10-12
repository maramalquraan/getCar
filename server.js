// Our holy server ...
var express = require('express');
var morgan = require('morgan');
var bodyParser=require('body-parser');
var path = require('path')
var user = require("./db/db.js"); // Our user database
var car = require("./db/carDB.js") // Our car database
var acc = require("./db/acc.js") // Our car database


var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var app = express();
var session = require("express-session");
var http = require('http').Server(app);
var io = require('socket.io')(http);


// those two lines are for payload size so you can upload large files ...
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb'}));
/////
app.use(session({secret : "session"}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/'));

// This variable will tell the app if there's anyone logged in.
var logged = false;

// This variable will hold the information of the logged in user.
// check line 111 ..
var userlogged = [];

// app.post("/search", urlencodedParser, function(req, res){
// 	var options={
// 		url:"https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/"+ req.body.type 
// 		+ "/modelyear/" + req.body.year + "?format=json,",
// 		method: "GET",
// 		headers: {
// 			 'User-Agent': 'mmmmmmmm',
//     		'Accept': 'application/json',
//     		'Accept-Charset': 'utf-8',
// 		}

// 	}
// })

// This get will start at the beginning to bring all the data from the cars database
app.get('/data',function(req, res){
  car.find({}, function(err,data){
  	// Pushing the logged in variable with the data
	data.push(logged ,userlogged);
	// Sending data to the front end.
	res.json(data);
	// res.send(data)
  });
});

app.post('/deleteCar' , function (req , res) {
	/* body... */
	console.log(req.body.id)
	car.findOneAndRemove({_id : req.body.id},function (error) {
		/* body... */
		// console.log(_id)
		if(error){
			res.send(error)
		}
		else{
			res.send('item Deleted')
		}
	})
})
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
/*     Eliminate the session ..
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
// sorry, it's line 126 .
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
	// oops!, check line 55 maybe ? ¯\_(ツ)_/¯

	
	var carr = new car ({
		username: req.body.username,
		phone: req.body.phone,
		type: req.body.type,
		color: req.body.color,
		price: req.body.price,
		image: req.body.image,
		option :req.body.option
	});
  carr.save(function(err, carr){
		if (err){
			console.log(err)
		};
	});
	res.end();
});
app.put("/addComment",function(req,res){
	// var username = req.body.username;
 //    var comment = req.body.comment;
 //    var comments = {
 //       username:username,
 //        comment:comment
 //    };
 //    var newcomment = new car(comments);
 //    newcomment.save()
 //    .then(item=>{
 //        res.send(newcomment)
 //    })
 //    .catch(err => {
 //        res.status(400).send("unable to save to database")
 //    })
 console.log(req.body)
 		var newComment = req.body.comment;
 		var username = req.body.username;
 		console.log(newComment)
 		 car.update({
         _id : req.body.id
    }, {
        $push: {
            comment:{ newComment ,username}
        }
    }, function(err, updateComment) {
        if (err) {
            console.log('error')
        } else {
        	// console.log('///////////',updateComment)
            res.send(updateComment)
            
        }
    })
})

// Our wormHole ..
var port = process.env.PORT || 1000;
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

// acc.create({url:'https://img1.etsystatic.com/035/2/9636937/il_570xN.616006901_bl9y.jpg'},
// 	{url:'http://www.costtag.com/images/sony-xplod-car-stereo_0.jpg'},
// 	{url:"https://n4.sdlcdn.com/imgs/e/8/3/Intex-Car-Charger-Car-Mobile-SDL668144815-1-a0a02.png"},
// 	{url:'https://n1.sdlcdn.com/imgs/e/t/q/230X258_sharpened/E-Lv-Car-Mobile-Holder-SDL020970228-1-4c6ab.jpg'},
// 	{url:'http://imshopping.rediff.com/imgshop/300-300/shopping/pixs/26662/d/d0xybsaulsl1000_._autoright-5-in-1-car-cup-car-sunglass-car-mobile-holder-storage-cup-for-maruti-800.jpg'},
// 	{url:'https://images-eu.ssl-images-amazon.com/images/G/31//img17/Auto/June17/carstore/cleaning_1.jpg'},
// 	{url:'http://g-ecx.images-amazon.com/images/G/31/img17/Auto/June17/car-care.jpg'},
// 	{url:'http://n1.sdlcdn.com/imgs/a/q/w/Red-12-Led-Brake-Light-SDL339315534-1-2625b.jpg'},
// 	{url:'http://www.automotive-fleet.com/fc_images/news/m-triangles.jpg'},
// 	{url:'https://cdn2.bigcommerce.com/server5800/c1d62/products/333/images/4905/steering_wheel_holster_mount_Toyota_Tacoma_2003_66195__76899.1390798392.1280.1280.jpg?c=2'})

app.get('/acc', function(req, res) {

		acc.find({}, function(err,data){
			if(data.length===0){
					acc.create({url:'https://img1.etsystatic.com/035/2/9636937/il_570xN.616006901_bl9y.jpg',name:'leash flower',price:'$10',Phone_Number:'0789479394'},
	{url:'http://www.costtag.com/images/sony-xplod-car-stereo_0.jpg',name:'car-stereo',price:'100$',Phone_Number:'0789479394'},
	{url:"https://n4.sdlcdn.com/imgs/e/8/3/Intex-Car-Charger-Car-Mobile-SDL668144815-1-a0a02.png",name:'Car-Charger',price:'$5',Phone_Number:'0789479394'},
	{url:'https://n1.sdlcdn.com/imgs/e/t/q/230X258_sharpened/E-Lv-Car-Mobile-Holder-SDL020970228-1-4c6ab.jpg',name:'Car-Mobile-Holder',price:'$10',Phone_Number:'0789479394'},
	{url:'http://imshopping.rediff.com/imgshop/300-300/shopping/pixs/26662/d/d0xybsaulsl1000_._autoright-5-in-1-car-cup-car-sunglass-car-mobile-holder-storage-cup-for-maruti-800.jpg',name:'car-cup',price:'$15',Phone_Number:'0789479394'},
	{url:'https://images-eu.ssl-images-amazon.com/images/G/31//img17/Auto/June17/carstore/cleaning_1.jpg',name:'car ahampoo',price:'$17',Phone_Number:'0789479394'},
	{url:'http://g-ecx.images-amazon.com/images/G/31/img17/Auto/June17/car-care.jpg',name:'car-care',price:'$12',Phone_Number:'0789479394'},
	{url:'http://n1.sdlcdn.com/imgs/a/q/w/Red-12-Led-Brake-Light-SDL339315534-1-2625b.jpg'},
	{url:'http://www.automotive-fleet.com/fc_images/news/m-triangles.jpg',name:'triangles',price:'$10',Phone_Number:'0789479394'},
	{url:'https://cdn2.bigcommerce.com/server5800/c1d62/products/333/images/4905/steering_wheel_holster_mount_Toyota_Tacoma_2003_66195__76899.1390798392.1280.1280.jpg?c=2',name:'steering_wheel_holster_mount',price:'$20',Phone_Number:'0789479394'})

			}
			if(err){
				// console.log('///////////bidErr')
				throw err;
			}else{
				// console.log('////////////',data)
				 res.json(data)
				// acc.remove( { } )

				 console.log("send data")

			}
  });
	});




// Start listening ...

http.listen(port, function() {


console.log("	   *   '*");
console.log("              *");
console.log("                   *");
console.log("                           *");
console.log("                  *");
console.log("                         *");
console.log(`you are now connected to:  ${port}`);
});

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// });
// io.on('connection', function(socket){
//   socket.broadcast.emit('hi');
// });
    io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
   

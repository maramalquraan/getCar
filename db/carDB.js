/*
                                 _..-------++._
                             _.-'/ |      _||  \"--._
                       __.--'`._/_\j_____/_||___\    `----.
                  _.--'_____    |          \     _____    /
                _j    /,---.\   |        =o |   /,---.\   |_
               [__]==// .-. \\==`===========/==// .-. \\=[__]
                 `-._|\ `-' /|___\_________/___|\ `-' /|_.'     
                       `---'                     `---'
*/
var mongoose = require("mongoose");
// var mongoURI = "mongodb://localHost/techJungle";
var mongoURI = "mongodb://techJungle:techJungle5@ds159344.mlab.com:59344/get-car";
var db = mongoose.connection;
var Schema = mongoose.Schema;
// car schema
var carSchema = new Schema({
    username: String,
    phone: Number,
	  image: String,
    type : {type: String, uppercase: true},
    color: {type: String, uppercase: true},
    price: Number
});
var carModel = mongoose.model('carModel',carSchema);

mongoose.connect(mongoURI,{useMongoClient: true});
db.once("open", function(){
   console.log("connect to db");
 }).on("error", function(){
   console.log("ERROR CONNECT to db");
 });
module.exports = carModel;

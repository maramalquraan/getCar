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
// var mongoURI = "mongodb://localHost/GTR";
// var mongoURI = "mongodb://Doaa:4140063Dd@ds113795.mlab.com:13795/doaa";
var mongoURI = 'mongodb://mazendb:4462097Mm@ds151544.mlab.com:51544/mazendb';
var db = mongoose.connection;
var Schema = mongoose.Schema;
// car schema
var carSchema = new Schema({
    username: String,
    phone: Number,
	  image: String,
    type : {type: String, uppercase: true},
    color: {type: String, uppercase: true},
    price: Number,
    option : String,
    comment: Array

});
var carModel = mongoose.model('carModel',carSchema);

mongoose.connect(mongoURI,{useMongoClient: true});
db.once("open", function(){
   console.log("connect to db");
 }).on("error", function(){
   console.log("ERROR CONNECT to db");
 });
module.exports = carModel;

/*

               STARTING THE DOS EDITOR
               -----------------------

  /mmm\        /mmm\        /mmm\
  (O o)        (O O)        (o o)
    U            U            u           /mmm\
  ||\  \\        / \\         .           (- -)
 oOOo__oOOo   _____oOOo  ___________      __u_oOOo
############  #########  ###########  ################
(BAD ANSWER)   (RETRY)   (ONCE MORE)  (Bored & Asleep)
*/


var mongoose = require("mongoose");

var mongoURI = "mongodb://localHost/GTR";
// var mongoURI = "mongodb://Doaa:4140063Dd@ds113795.mlab.com:13795/doaa";
// var mongoURI = "mongodb://Doaa:4140063Dd@ds113795.mlab.com:13795/doaa";


var db = mongoose.connection;
var Schema = mongoose.Schema;
// car schema

var userSchema = new Schema({
  username: String,
  password: String,
  phone: Number,
  email: String
});

var User = mongoose.model('User', userSchema);

mongoose.connect(mongoURI,{useMongoClient: true});
db.once("open", function(){
   console.log("connect to db");
 }).on("error", function(){
   console.log("ERROR CONNECT to db");
 })

module.exports = User;
var mongoose = require("mongoose");
var mongoURI = "mongodb://localHost/techJungle";
// var mongoURI = "mongodb://techJungle:techJungle5@ds159344.mlab.com:59344/get-car";
var db = mongoose.connection;
var Schema = mongoose.Schema;
// car schema
var accSchema = new Schema({
    url: String,
    name:String,
    price:String,
    Phone_Number:String
});
var accModel = mongoose.model('accModel',accSchema);
// db.collection.createIndex( { url:1 }, { unique:true, dropDups:true } )


mongoose.connect(mongoURI,{useMongoClient: true});
db.once("open", function(){
   console.log("connect to db");
 }).on("error", function(){
   console.log("ERROR CONNECT to db");
 });
module.exports = accModel;

var mongoose = require("mongoose");
var mongoURI = "mongodb://localHost/GTR";
// var mongoURI = "mongodb://Doaa:4140063Dd@ds113795.mlab.com:13795/doaa";
var db = mongoose.connection;
var Schema = mongoose.Schema;
// car schema
var accSchema = new Schema({
    url: String,
    name:String,
    price:String
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

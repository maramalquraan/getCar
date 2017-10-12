var mongoose = require("mongoose");
// var mongoURI = "mongodb://localHost/GTR";
var mongoURI = 'mongodb://mazendb:4462097Mm@ds151544.mlab.com:51544/mazendb';
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

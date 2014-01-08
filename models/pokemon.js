/*
	Pokemon model.
*/

var mongoose = require("mongoose"),
	Schema = mongoose.Schema;
 
var schema = new Schema({
	name: String,
	dexNumber: Number,
	color: String
});

// haha; mongoose creates a "pokemons" table
module.exports = mongoose.model("Pokemon", schema);

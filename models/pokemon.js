/*
	Pokemon model.
*/

var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// TODO determine final Pokemon schema
var schema = new Schema({
	abilities: [{ value: String, hidden: Boolean}],
	color: String,
	name: String,
	nationalDex: Number,
	types: [{ value: String }]
});

// haha; mongoose creates a "pokemons" table
module.exports = mongoose.model("Pokemon", schema);

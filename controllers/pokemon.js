/*
	Pokemon controller.
*/

var Pokemon = require("../models/pokemon.js");
 
var post = function(req, res) {
	new Pokemon({
		abilities: req.body.abilities,
		color: req.body.color,
		name: req.body.name,
		nationalDex: req.body.nationalDex,
		types: req.body.types
	}).save();
	res.send("Saved pokemon.");
};
 
var find = function(req, res) {
	Pokemon.find(function(err, pokemon) {
		res.send(pokemon);
	});
};

module.exports = function(app) {
	app.post("/pokemon", post);
	app.get("/pokemon", find);
};

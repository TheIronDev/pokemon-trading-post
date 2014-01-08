/*
	Pokemon controller.
*/

var Pokemon = require("../models/pokemon.js");
 
post = function(req, res) {
	new Pokemon({
		name: req.body.name,
		dexNumber: req.body.dexNumber,
		color: req.body.color
	}).save();
	res.send("Saved pokemon.");
}
 
find = function(req, res) {
	Pokemon.find(function(err, pokemon) {
		res.send(pokemon);
	});
}

module.exports = function(app) {
	app.post("/pokemon", post);
	app.get("/pokemon", find);
};

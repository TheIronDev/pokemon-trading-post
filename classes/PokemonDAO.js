var BasicDAO = require("./BasicDAO");

var that;

function PokemonDAO(app, collectionName) {
	that = this;

	BasicDAO.call(this, app, collectionName);

	// TODO set up routing for Pokemon related REST endpoints
}

PokemonDAO.prototype = Object.create(BasicDAO.prototype);
PokemonDAO.prototype.constructor = PokemonDAO;

PokemonDAO.prototype._populateCollection = function() {
	// TODO use Veekun to populate this collection

	var data = [
	{
		name: "Bulbasaur",
		dexNumber: "1",
		color: "green"
	},
	{
		name: "Ivysaur",
		dexNumber: "2",
		color: "green"
	},
	{
		name: "Venusaur",
		dexNumber: "3",
		color: "green"
	}];

	that._db.collection(that._collectionName, function(err, collection) {
		collection.insert(data, {safe:true}, function(err, result) {
			if (err) {
				throw err;
			}
			console.log("Populated \"" + that._collectionName + "\" collection.");
		});
	});
};

module.exports = PokemonDAO;

var express = require("express");
var BasicDAO = require("./classes/BasicDAO");
var PokemonDAO = require("./classes/PokemonDAO");

var app = express();

app.configure(function() {
	app.use(express.logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded());
});

// TODO remove test route
app.get("/", function(request, response) {
	response.send("Hello world!");
});

// TODO initialze DAOs
var pokemonDAO = new PokemonDAO(app, "pokemon");

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log("Listening on port " + port + "...");
	console.log("http://localhost:" + port);
});



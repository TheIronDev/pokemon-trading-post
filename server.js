var express = require("express");
var BasicDAO = require("./classes/BasicDAO");
var PokemonDAO = require("./classes/PokemonDAO");
var ejs = require('ejs'),
	engine = require('ejs-locals');

var app = express();

app.configure(function() {
	app.engine('ejs', engine);
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/views');
	app.use(express.logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded());
});

// Initialize home view
require("./controllers/index.js")(app);

// TODO initialze DAOs
var pokemonDAO = new PokemonDAO(app, "pokemon");

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log("Listening on port " + port + "...");
	console.log("http://localhost:" + port);
});



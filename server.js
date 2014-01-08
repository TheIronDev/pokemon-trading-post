// external imports
var ejs = require('ejs'),
	engine = require('ejs-locals'),
	express = require("express");
// internal imports
var BasicController = require("./controllers/BasicController"),
	PokemonController = require("./controllers/PokemonController");

var app = express();
var databaseName = "pokemondb";

app.configure(function() {
	app.engine('ejs', engine);
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/views');
	app.use(express.logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded());
});

// TODO move db initialization here and pass db object to controllers

// initialize home view
require("./controllers/index.js")(app);

// TODO initialze controllers
var PokemonController = new PokemonController(app, "pokemon");

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log("Listening on port " + port + "...");
	console.log("http://localhost:" + port);
});



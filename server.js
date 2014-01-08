var ejs = require("ejs"),
	engine = require("ejs-locals"),
	express = require("express"),
	mongoose = require("mongoose");

var app = express();

// connect to Mongo via Mongoose
var databaseName = "pokemondb";
var uri = process.env.MONGOLAB_URI || 
	process.env.MONGOHQ_URL ||
	"mongodb://localhost/" + databaseName;
mongoose.connect(uri);
// TODO try to trigger error
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", function callback () {
	console.log("Connected to " + uri);
});

// TODO is the app initialization in the right place?
app.configure(function() {
	app.engine("ejs", engine);
	app.set("view engine", "ejs");
	app.set("views", __dirname + "/views");
	app.use(express.logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded());
});

// initialize home view
require("./controllers/index.js")(app);
// initialize controllers
require("./controllers/pokemon.js")(app);

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log("Listening on port " + port + "...");
	console.log("http://localhost:" + port);
});

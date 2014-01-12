var ejs = require("ejs"),
	engine = require("ejs-locals"),
	fs = require("fs"),
	http = require("http"),
	https = require("https"),
	express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require('passport-local').Strategy;

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

// TODO should the app initialization occur before Mongoose?
app.configure(function() {
	app.engine("ejs", engine);
	// node can't run on standard http and https ports unless running as root
	app.set("port", process.env.PORT || 8080);
	app.set("sslport", process.env.SSLPORT || 8081);
	app.set("view engine", "ejs");
	app.set("views", __dirname + "/views");
	app.use(express.logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded());
});

// Init Passport Authentication middleware.
require("./middleware/passportImpl.js")(app);

// initialize home view
require("./controllers/index.js")(app);
// initialize controllers
require("./controllers/pokemon.js")(app);

// set up a server
http.createServer(app).listen(app.get("port"), function() {
	console.log("Listening on port " + app.get("port") + "...");
	console.log("http://localhost:" + app.get("port"));
});

// set up a ssl-enabled server
var options = {
	key: fs.readFileSync("./ssl/key.pem"),
	cert: fs.readFileSync("./ssl/cert.pem")
};

https.createServer(options, app).listen(app.get("sslport"), function() {
	console.log("Listening on ssl-enabled port " + app.get("sslport") + "...");
	console.log("https://localhost:" + app.get("sslport"));
});

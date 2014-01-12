/*
	Authentication controller.

	This file uses https://github.com/TheIronDeveloper/pokemon-wondertrade-analytics/blob/master/controllers/authentication.js as an example.
*/

var LocalStrategy = require("passport-local").Strategy,
	User = require("../models/user.js");

injectUser = function(req, res, next){
	// inject a dummy user for now
	req.body = {
		username: "John Doe",
		email: "jdoe@gmail.com",
		password: "password"
	};
	next();
};

login = function(req, res) {
	res.send("Logged in as user: " + JSON.stringify(req.user.username));
}

register = function(req, res) {
	new User({
		username: req.body.username,
		// TODO don't send password as plaintext
		password: req.body.password,
		email: req.body.email
	}).save();
	res.send("Registered user.");
}

// TODO remove this function; used to test user injection
find = function(req, res) {
	res.send(req.body);
}

module.exports = function(app, passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new LocalStrategy(
		function(username, password, done) {
			User.findOne({ username: username }, function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					// TODO setup failure flash
					return done(null, false, { message: "Incorrect username." });
				}
				// TODO validate password
				/*
				if (!user.validPassword(password)) {
					return done(null, false, { message: "Incorrect password." });
				}
				*/

				return done(null, user);
			});
		}
	));

	// TODO remove user injection
	app.get("*", injectUser);
	app.post("*", injectUser);
	// TODO move this to user controller
	app.get("/user", find);
	app.post("/login", passport.authenticate("local"), login);
	app.post("/register", register);
};

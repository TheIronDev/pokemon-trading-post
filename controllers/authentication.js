/*
	Authentication controller.

	This file uses https://github.com/TheIronDeveloper/pokemon-wondertrade-analytics/blob/master/controllers/authentication.js as an example.
*/

var LocalStrategy = require("passport-local").Strategy,
	User = require("../models/user.js");

ensureAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect("/");
}

// TODO move this function to a user controller?
find = function(req, res) {
	res.render("profile", {
		username: JSON.stringify(req.user.username),
		email: JSON.stringify(req.user.email)
	});
}

login = function(req, res) {
	res.render("login", {
		message: req.flash("loginMessage")
	});
}

logout = function(req, res) {
	req.logout();
	res.redirect("/");
}

register = function(req, res) {
	res.render("register", {
		message: req.flash("registerMessage")
	});
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

	passport.use("local-register", new LocalStrategy({
			passReqToCallback: true
		},
		function(req, username, password, done) {
			User.findOne({ username: username }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, false, req.flash("registerMessage", "Username already taken."));
				}

				var newUser = new User({
					username: req.body.username,
					// TODO don"t send password as plaintext
					password: req.body.password,
					email: req.body.email
				});
				// operate asynchronously, otherwise you might not redirect
				newUser.save();

				return done(null, newUser);
			});
		}
	));

	passport.use("local-login", new LocalStrategy({
			passReqToCallback: true
		},
		function(req, username, password, done) {
			req.logout();
			User.findOne({ username: username }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (!user) {
					return done(null, false, req.flash("loginMessage", "Incorrect username."));
				}

				if (!user.validPassword(password)) {
					return done(null, false, req.flash("loginMessage", "Incorrect password."));
				}

				return done(null, user);
			});
		}
	));

	// TODO move this to user controller?
	app.get("/profile", ensureAuthenticated, find);
	app.get("/login", login);
	app.post("/login", passport.authenticate("local-login", {
		successRedirect: "/profile",
		failureRedirect: "/login",
		failureFlash: true
	}));
	app.get("/logout", logout);
	app.get("/register", register);
	app.post("/register", passport.authenticate("local-register", {
		successRedirect: "/profile",
		failureRedirect: "/register",
		failureFlash: true
	}));
};

/*
	User model.
	Should be used with the following passport strategies:
	FacebookStrategy, GoogleStrategy, and TwitterStrategy
	(and any other strategies that use OpenID or OAuth),
	or LocalStrategy (if the user does not want to use OpenID or OAuth).
	A User will most likely not have both an externalId and a password.
*/

var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// TODO determine final User schema
var schema = new Schema({
	dateCreated: { type: Date, default: Date.now},
	// could be OpenID or OAuth
	externalId: Number,
	username: String,
	password: String,
	email: String
});

schema.methods.validPassword = function(password) {
	// TODO encrypt passwords
	return this.password == password;
}

module.exports = mongoose.model("User", schema);

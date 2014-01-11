/*
	User model.
	Should be used with the following passport strategies:
	FacebookStrategy, GoogleStrategy, and TwitterStrategy
	(and any other strategies that use OpenID or OAuth).
*/

var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// TODO determine final User schema
var schema = new Schema({
	dateCreated: { type: Date, default: Date.now},
	// could be OpenID or OAuth
	externalId: Number,
	username: String,
});

module.exports = mongoose.model("User", schema);

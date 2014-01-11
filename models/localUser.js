/*
	LocalUser model.
	Should be used with the following passport strategies:
	LocalStrategy.
*/

var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// TODO determine final LocalUser schema
var schema = new Schema({
	dateCreated: { type: Date, default: Date.now},
	username: String,
	password: String
});

module.exports = mongoose.model("LocalUser", schema);

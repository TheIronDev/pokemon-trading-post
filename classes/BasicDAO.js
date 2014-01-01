var BSON = require("mongodb").BSONPure;
var MongoClient = require("mongodb").MongoClient;
var Server = require("mongodb").Server;

var that;
var databaseName = "pokemondb";

function BasicDAO(app, collectionName) {
	that = this;

	this._app = app;
	this._collectionName = collectionName;

	// set up the connection to the database
	// TODO determine whether we want to do this every time we have a DAO
	this._mongoClient = new MongoClient(new Server("localhost", 27017));

	this._mongoClient.open(function(err, mongoClient) {
		that._db = mongoClient.db(databaseName);
		if(!err) {
			console.log("Connected to \"" + databaseName + "\" database.");
			that._checkCollection();
		}
	});

	// set up routing
	this._app.post("/" + this._collectionName, this._add);
	this._app.delete("/" + this._collectionName + "/:id", this._delete);
	this._app.get("/" + this._collectionName + "/:id", this._find);
	this._app.get("/" + this._collectionName, this._findAll);
	this._app.put("/" + this._collectionName + "/:id", this._update);
}

BasicDAO.prototype._app = null;
BasicDAO.prototype._db = null;
BasicDAO.prototype._mongoClient = null;
BasicDAO.prototype._collectionName = null;

BasicDAO.prototype._add = function(req, res) {

};

BasicDAO.prototype._checkCollection = function() {
	that._db.collection(that._collectionName, {strict:true}, function(err, collection) {
		if (err) {
			console.log("The \"" + that._collectionName + "\" collection does not exist.");

			that._populateCollection();
		}
	});
};

BasicDAO.prototype._delete = function(req, res) {

};

BasicDAO.prototype._find = function(req, res) {

};

BasicDAO.prototype._findAll = function(req, res) {
	that._db.collection(that._collectionName, function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

BasicDAO.prototype._populateCollection = function() {
	// TODO freakout if this function is called
	console.log("What are you doing?");
};

BasicDAO.prototype._update = function(req, res) {

};

module.exports = BasicDAO;

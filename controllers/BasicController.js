var BSON = require("mongodb").BSONPure,
	MongoClient = require("mongodb").MongoClient,
	Server = require("mongodb").Server;

var that;
var databaseName = "pokemondb";

function BasicController(app, collectionName) {
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

BasicController.prototype._app = null;
BasicController.prototype._db = null;
BasicController.prototype._mongoClient = null;
BasicController.prototype._collectionName = null;

BasicController.prototype._add = function(req, res) {
	var data = req.body;
	if (JSON.stringify(data) === "{}") {
		res.send({"error":"Stringified JSON was empty"});
		return;
	}
	console.log("Adding " + that._collectionName + ": " + JSON.stringify(data));
	that._db.collection(that._collectionName, function(err, collection) {
		collection.insert(data, {safe:true}, function(err, result) {
			if (err) {
				res.send({"error":"An error has occurred"});
			} else {
				console.log("Success: " + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};

BasicController.prototype._checkCollection = function() {
	that._db.collection(that._collectionName, {strict:true}, function(err, collection) {
		if (err) {
			console.log("The \"" + that._collectionName + "\" collection does not exist.");

			that._populateCollection();
		}
	});
};

BasicController.prototype._delete = function(req, res) {
	var id = req.params.id.toString();
	if (!isValid(id)) {
		console.log("Error deleting " + that._collectionName + ": " + id);
		res.send({"error":"An error has occurred"});
		return;
	}
	console.log("Deleting " + that._collectionName + ": " + id);
	that._db.collection(that._collectionName, function(err, collection) {
		collection.remove({"_id":new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
			if (err) {
				res.send({"error":"An error has occurred - " + err});
			} else {
				console.log(result + " document(s) deleted");
				res.send({"delete":"Deleted " + that._collectionName + ": " + id});
			}
		});
	});
};

BasicController.prototype._find = function(req, res) {
	var id = req.params.id.toString();
	if (!isValid(id)) {
		console.log("Error finding " + that._collectionName + ": " + id);
		res.send({"error":"An error has occurred"});
		return;
	}
	console.log("Retrieving " + that._collectionName + ": " + id);
	that._db.collection(that._collectionName, function(err, collection) {
		collection.findOne({"_id":new BSON.ObjectID(id)}, function(err, item) {
			res.send(item);
		});
	});
};

BasicController.prototype._findAll = function(req, res) {
	that._db.collection(that._collectionName, function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

BasicController.prototype._populateCollection = function() {
	// TODO freakout if this function is called
	console.log("What are you doing?");
};

BasicController.prototype._update = function(req, res) {
	var id = req.params.id.toString();
	if (!isValid(id)) {
		console.log("Error updating " + that._collectionName + ": " + id);
		res.send({"error":"An error has occurred"});
		return;
	}
	var data = req.body;
	if (JSON.stringify(data) === "{}") {
		res.send({"error":"Stringified JSON was empty"});
		return;
	}
	console.log("Updating " + that._collectionName + ": " + id);
	console.log(JSON.stringify(data));
	that._db.collection(that._collectionName, function(err, collection) {
		// TODO make sure order or JSON attributes stays same upon update
		collection.update({"_id":new BSON.ObjectID(id)}, data, {safe:true}, function(err, result) {
			if (err) {
				console.log("Error updating " + that._collectionName + ": " + err);
				res.send({"error":"An error has occurred"});
			} else {
				console.log("" + result + " document(s) updated");
				res.send(data);
			}
		});
	});
};

function isValid(id) {
	return id !== null && (id.length === 12 || id.length === 24);
}

module.exports = BasicController;

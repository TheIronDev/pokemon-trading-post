// Using https://github.com/TheIronDeveloper/pokemon-wondertrade-analytics/blob/master/controllers/authentication.js as a reference point.

module.exports = function(app){

	/**
	 * Intercept every request to add the currentUser
 	 */
	app.get("*", function(request, response, next) {
		// Provide a dummy user for now.
		request.currentUser = {
			id:1,
			username: "John Doe",
			email: "jdoe@gmail.com"
		};
		next();
	});


	app.post('/register', function(request, response, next){
		// TODO
	});

	app.post('/login', function(request, response, next){
		// TODO
	});
};
var mongoose = require("mongoose");
var User = mongoose.model("User");


module.exports = {
	ensureAuthenticated: function (req, res, next) {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.status(401).end();
		}
	},

	isUserOrAdmin: function (req, res, next) {
		User.findById(req.session.passport.user)
		.exec()
		.then(function(user){
			if(user.roles.indexOf('Admin')!== -1){
				next();
			}else if(user.password === req.user.password){
				next();
			}
			else{
				res.status(403).end
			}
		}, function(){
			res.status(403).end
		})
	},

	isMerchantOrAdmin: function (req, res, next) {
		User.findById(req.session.passport.user)
		.exec()
		.then(function(user){
			if(user.roles.indexOf('Admin')!== -1){
				next();
			}else if(user.password === req.store.password){
				next();
			}
			else{
				res.status(403).end
			}
		}, function(){
			res.status(403).end
		})
	},


	isAdmin: function (req, res, next) {
		User.findById(req.session.passport.user)
		.exec()
		.then(function(user){
			if(user.roles.indexOf('Admin')!== -1){
				next();
			}
			else{
				res.status(403).end
			}
		}, function(){
			res.status(403).end
		})
	}
}




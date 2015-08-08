"use strict";
var router = require("express").Router();
require("../../../db/models");
var mongoose = require("mongoose");
module.exports = router;
var Promise = require("bluebird");
var Product = Promise.promisifyAll(mongoose.model("Product"));
var productSearch = function (string) {
	return new Promise(function(resolve, reject){
		Product.search(string, function (err, data){
			if(err) reject(err);
			else resolve(data);
		})
	});
};

router.get("/:searchString", function (req, res, next) {
	productSearch(decodeURI(req.params.searchString)).then(function(products){
		res.json(products);
	}, next);
});

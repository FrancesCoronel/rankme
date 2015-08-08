"use strict";
var router = require("express").Router();
require("../../../db/models");
var mongoose = require("mongoose");
module.exports = router;
var Product = mongoose.model("Product");

var request = require('request');
var cheerio = require('cheerio');

request('http://www.quora.com/Fullstack-Academy', function(err, res, body) {
    if (!err & res.statusCode === 200) {
        var $ = cheerio.load(body);
        var numReviews = $('span.count', '.primary_item').text();
        console.log(numReviews);
        var avgRating = $('span.review_rating').children().length;
        console.log(avgRating);
    }
});

router.post("/", function(req, res) {
    Product.create();
});

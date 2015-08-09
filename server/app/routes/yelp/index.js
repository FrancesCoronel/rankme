"use strict";
var router = require("express").Router();
require("../../../db/models");
//var mongoose = require("mongoose");
module.exports = router;
var request = require('request');
var cheerio = require('cheerio');

router.get('/api/yelp/:url', function(req) {
    request(req.params.url, function(err, res, body) {
        if (!err & res.statusCode === 200) {
            var $ = cheerio.load(body);
            var numReviews = $("span[itemprop='reviewCount']").text();
            console.log(numReviews);
            var floatAvgRating = $("meta[itemprop='ratingValue']").attr('content');
            var avgRating = floatAvgRating | 0;
            console.log(avgRating);
            res.json({
                yelpNumReviews: numReviews,
                yelpAvgRating: avgRating
            });
        }
    });
});

// DONE
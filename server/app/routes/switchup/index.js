"use strict";
var router = require("express").Router();
require("../../../db/models");
//var mongoose = require("mongoose");
module.exports = router;
var request = require('request');
var cheerio = require('cheerio');

router.get('/api/switchup/:url', function(req) {
    request(req.params.url, function(err, res, body) {
        if (!err & res.statusCode === 200) {
            var $ = cheerio.load(body);
            var numReviews = $("span[itemprop='reviewCount']").text();
            console.log(numReviews);
            var avgRating = $("span[itemprop='ratingvalue']").text();
            console.log(avgRating);
            res.json({
                switchupNumReviews: numReviews,
                switchupAvgRating: avgRating
            });
        }
    });
});

// DONE
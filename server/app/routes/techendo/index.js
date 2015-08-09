"use strict";
var router = require("express").Router();
require("../../../db/models");
//var mongoose = require("mongoose");
module.exports = router;
var request = require('request');
var cheerio = require('cheerio');

router.get('/api/techendo/:url', function(req) {
    request(req.params.url, function(err, res, body) {
        if (!err & res.statusCode === 200) {
            var $ = cheerio.load(body);
            var positiveReviews = $('div.rating span.positive-ratings-count').text();
            console.log(positiveReviews);
            var negativeReviews = $('div.rating span.negative-ratings-count').text();
            console.log(negativeReviews);
            var numReviews = positiveReviews + negativeReviews;
            console.log(numReviews);
            res.json({
                techendoNegativeReviews: negativeReviews,
                techendoPositiveReviews: positiveReviews,
                techendoNumReviews: numReviews,
            });
        }
    });
});

// DONE, but still need to calculate average review somehow
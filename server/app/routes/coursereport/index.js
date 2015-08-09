"use strict";
var router = require("express").Router();
require("../../../db/models");
//var mongoose = require("mongoose");
module.exports = router;
var request = require('request');
var cheerio = require('cheerio');

router.get('/api/coursereport/:url', function(req) {
    request(req.params.url, function(err, res, body) {
        if (!err & res.statusCode === 200) {
            var $ = cheerio.load(body);
            var numStringReviews = $('#reviews_tab').children().text();
            var numReviews = numStringReviews.match(/\d+$/)[0];
            console.log(numReviews);
            res.json({
                courseReportNumReviews: numReviews
            });
        }
    });
});

// DONE, but could be optimized
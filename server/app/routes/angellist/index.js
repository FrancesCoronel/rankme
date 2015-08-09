"use strict";
var router = require("express").Router();
require("../../../db/models");
module.exports = router;
var request = require('request');
var cheerio = require('cheerio');

router.get('/api/angellist/:url', function(req) {
    request(req.params.url, function(err, res, body) {
        if (!err & res.statusCode === 200) {
            var $ = cheerio.load(body);
            var numFollowers = $('.tabs span').eq(2).children().children().text();
            console.log(numFollowers);
            res.json({
                angelListNumFollowers: numFollowers
            });
        }
    });
});

// DONE
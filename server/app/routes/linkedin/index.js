"use strict";
var router = require("express").Router();
require("../../../db/models");
//var mongoose = require("mongoose");
module.exports = router;
var request = require('request');
var cheerio = require('cheerio');

router.get('/api/linkedin/:url', function(req) {
    request(req.params.url, function(err, res, body) {
        if (!err & res.statusCode === 200) {
            var $ = cheerio.load(body);
            var numFollowers = $('.followers-count-num').text();
            console.log(numFollowers);
            res.json({
                linkedinNumFollowers: numFollowers
            });
        }
    });
});

// DONE
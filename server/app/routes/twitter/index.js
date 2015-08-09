"use strict";
var router = require("express").Router();
require("../../../db/models");
//var mongoose = require("mongoose");
module.exports = router;
var request = require('request');
var cheerio = require('cheerio');

router.get('/api/twitter/:url', function(req) {
    request(req.params.url, function(err, res, body) {
        if (!err & res.statusCode === 200) {
            var $ = cheerio.load(body);
            var numStringFollowers = $(".ProfileNav").children().children().eq(2).children().children("span").text();
            // this comes out as Followers12445
            var numFollowers = numStringFollowers.match(/\d+$/)[0];
            console.log(numFollowers);
            var logo = $('.ProfileAvatar-image').attr('src');
            console.log(logo);
            var bio = $('.ProfileHeaderCard-bio').text();
            console.log(bio);
            var homePage = $('a.u-textUserColor','.ProfileHeaderCard').text();
            console.log(homePage);
            res.json({
                twitterNumFollowers: numFollowers,
                twitterLogo: logo,
                twitterBio: bio,
                twitterHomePage: homePage
            });
        }
    });
});

// DONE, but could be optimized
var http = require("http");
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Product = Promise.promisifyAll(mongoose.model('Product'));
var deferred = require('deferred');
var request = require('request');
var cheerio = require('cheerio');

var deferredRequest = function(url) {
    var d = deferred();
    request(url, function(err, resp, body) {
        if (err) {
            d.reject(new Error("Unable to fetch '" + url + "', reason: " + err));
            return;
        }
        if (resp.statusCode !== 200) {
            d.reject(new Error("Unable to fetch '" + url + "', code: " + resp.statusCode));
            return;
        }
        d.resolve(body);
    });
    return d.promise();
};

var getBootcamps = function(urls) {
    var product = {};
    product.title = urls.title;
    var socialScore = 0;
    var reviewScore = 0;
    var ratingScore = 0;
    // scraping AngelList
    var angelListURL = urls.angelList;
    deferredRequest(angelListURL).then(function(data) {
        var $ = cheerio.load(data);
        var angelListNumFollowers = $('.tabs span').eq(2).children().children().text();
        console.log(angelListNumFollowersnumFollowers);
        product.angellist.followers = angelListNumFollowers;
        socialScore += angelListNumFollowers;

    }).done(function(res) {
        console.log("SUCCESS" + res.json());
    }, function(err) {
        console.log("ERROR: " + err);
    });
    // scraping Course Report
    var courseReportURL = urls.courseReport;
    deferredRequest(courseReportURL).then(function(data) {
        var $ = cheerio.load(data);
        var numStringReviews = $('#reviews_tab').children().text();
        var courseReportNumReviews = numStringReviews.match(/\d+$/)[0];
        reviewScore += courseReportNumReviews;
        console.log(courseReportNumReviews);
        product.courseReport.num = courseReportNumReviews;
    });
    // scraping LinkedIn
    var linkedInURL = urls.linkedin;
    deferredRequest(linkedInURL).then(function(data) {
        var $ = cheerio.load(data);
        var linkedInNumFollowers = $('.followers-count-num').text();
        socialScore += linkedInNumFollowers;
        console.log(linkedInNumFollowers);
        product.linkedin.followers = linkedInNumFollowers;
    }).done(function(res) {
        console.log("SUCCESS" + res.json());
    }, function(err) {
        console.log("ERROR: " + err);
    });
    // scraping Quora
    // adding on to rating
    var quoraURL = urls.quora;
    deferredRequest(quoraURL).then(function(data) {
        var $ = cheerio.load(data);
        var quoraNumFollowers = $('span.count', '.primary_item').text();
        console.log(quoraNumFollowers);
        // adding to social score
        socialScore += quoraNumFollowers;
        var quoraNumReviews = $('span.hidden', '.TopicReviewRatingLabel').find('span.count').find('span.value-title').attr('title');
        console.log(quoraNumReviews);
        // adding to review score
        reviewScore += quoraNumReviews;
        var quoraAvgRating = $('span.review_rating').children().length;
        console.log(quoraAvgRating);
        // adding to rating score
        ratingScore += quoraAvgRating;
        product.quora.num = quoraNumReviews;
        product.quora.avg = quoraAvgRating;
        produc.quora.followers = quoraNumFollowers;
    }).done(function(res) {
        console.log("SUCCESS" + res.json());
    }, function(err) {
        console.log("ERROR: " + err);
    });
    // scraping switchup
    // adding on to rating
    var switchupURL = urls.switchup;
    deferredRequest(switchupURL).then(function(data) {
        var $ = cheerio.load(data);
        var switchupNumReviews = $("span[itemprop='reviewCount']").text();
        console.log(switchupNumReviews);
        reviewScore += switchupNumReviews;
        var switchupAvgRating = $("span[itemprop='ratingvalue']").text();
        console.log(switchupAvgRating);
        ratingScore += switchupAvgRating;
        product.switchup.num = switchupNumReviews;
        product.switchup.avg = switchupAvgRating;
    }).done(function(res) {
        console.log("SUCCESS" + res.json());
    }, function(err) {
        console.log("ERROR: " + err);
    });
    // scraping techendo
    var techendoURL = urls.techendo;
    deferredRequest(techendoURL).then(function(data) {
        var $ = cheerio.load(data);
        var techendoPositiveReviews = $('div.rating span.positive-ratings-count').text();
        console.log(techendoPositiveReviews);
        var techendoNegativeReviews = $('div.rating span.negative-ratings-count').text();
        console.log(techendoNegativeReviews);
        var techendoNumReviews = techendoPositiveReviews + techendoNegativeReviews;
        reviewScore += techendoNumReviews;
        console.log(techendoNumReviews);
        product.techendo.positive = techendoPositiveReviews;
        product.techendo.negative = techendoNegativeReviews;
        product.techendo.num = techendoNumReviews;
    }).done(function(res) {
        console.log("SUCCESS" + res.json());
    }, function(err) {
        console.log("ERROR: " + err);
    });
    // scraping twitter
    var twitterURL = urls.twitter;
    deferredRequest(twitterURL).then(function(data) {
        var $ = cheerio.load(data);
        var numStringFollowers = $(".ProfileNav").children().children().eq(2).children().children("span").text();
        // this comes out as Followers12445
        var twitterNumFollowers = numStringFollowers.match(/\d+$/)[0];
        console.log(twitterNumFollowers);
        socialScore += twitterNumFollowers;
        var twitterLogo = $('.ProfileAvatar-image').attr('src');
        console.log(twitterLogo);
        var twitterBio = $('.ProfileHeaderCard-bio').text();
        console.log(twitterBio);
        var twitterHomePage = $('a.u-textUserColor', '.ProfileHeaderCard').text();
        console.log(twiterHomePage);
        product.twitter.followers = twitterNumFollowers;
        product.description = twitterBio;
        product.logo = twitterLogo;
        product.homePage = twitterHomePage;
    }).done(function(res) {
        console.log("SUCCESS" + res.json());
    }, function(err) {
        console.log("ERROR: " + err);
    });
    // scraping yelp
    // adding on to rating
    var yelpURL = urls.yelp;
    deferredRequest(yelpURL).then(function(data) {
        var $ = cheerio.load(data);
        var yelpNumReviews = $("span[itemprop='reviewCount']").text();
        console.log(yelpNumReviews);
        reviewScore += yelpNumReviews;
        var floatAvgRating = $("meta[itemprop='ratingValue']").attr('content');
        var yelpAvgRating = floatAvgRating | 0;
        console.log(yelpAvgRating);
        ratingScore += yelpAvgRating;
    }).done(function(res) {
        console.log("SUCCESS" + res.json());
    }, function(err) {
        console.log("ERROR: " + err);
    });
    // summing up
    product.totalReviews = reviewScore;
    product.avgRating = ratingScore / 3;
    product.totalSocial = socialScore;
    Product.create(product);
};

var urls = [{
    title: "Dev Bootcamp",
    angelList: "https://angel.co/devbootcamp",
    courseReport: "https://www.coursereport.com/schools/dev-bootcamp",
    linkedin: "https://www.linkedin.com/company/dev-bootcamp",
    quora: "https://www.quora.com/Dev-Bootcamp",
    switchup: "https://www.switchup.org/bootcamps/dev-bootcamp",
    techendo: "https://schools.techendo.com/schools/dev-bootcamp",
    twitter: "https://twitter.com/devbootcamp",
    yelp: "http://www.yelp.com/biz/dev-bootcamp-san-francisco"
}];

for (var i = 0; i < urls.length; i++) {
    getBootcamps(urls[i]);
}

var http = require("http");
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Product = Promise.promisifyAll(mongoose.model('Product'));
var numeral = require('numeral');
var axios = require("axios");
var request = require('request');
var cheerio = require('cheerio');

// yelp needs to be http:// not https://

// var urls = [{
//     title: "Wyncode",
//     courseReport: "https://www.coursereport.com/schools/wyncode",
//     linkedin: "https://www.linkedin.com/company/wyncode",
//     quora: "https://www.quora.com/Wyncode",
//     switchup: "https://www.switchup.org/bootcamps/wyncode",
//     techendo: "https://schools.techendo.com/schools/ait-learning",
//     twitter: "https://twitter.com/wyncode",
//     yelp: "http://www.yelp.com/biz/wyncode-academy-miami"
// }, {
//     title: "Tradecraft",
//     courseReport: "https://www.coursereport.com/schools/tradecraft",
//     linkedin: "https://www.linkedin.com/company/tradecraft",
//     quora: "https://www.quora.com/Tradecrafted",
//     switchup: "https://www.switchup.org/bootcamps/tradecraft",
//     techendo: "https://schools.techendo.com/schools/ait-learning",
//     twitter: "https://twitter.com/Tradecraft",
//     yelp: "http://www.yelp.com/biz/tradecraft-san-francisco"
// }, {
//     title: "Flatiron",
//     courseReport: "https://www.coursereport.com/schools/flatiron-school",
//     linkedin: "https://www.linkedin.com/company/the-flatiron-school",
//     quora: "https://www.quora.com/Flatiron-School",
//     switchup: "https://www.switchup.org/bootcamps/the-flatiron-school",
//     techendo: "https://schools.techendo.com/schools/flatiron-school",
//     twitter: "https://twitter.com/flatironschool",
//     yelp: "http://www.yelp.com/biz/the-flatiron-school-new-york"
// }];

// hack reactor

var urls = [{
    title: "Hack Reactor",
    courseReport: "https://www.coursereport.com/schools/hack-reactor",
    linkedin: "https://www.linkedin.com/company/hack-reactor",
    quora: "https://www.quora.com/Hack-Reactor",
    switchup: "https://www.switchup.org/bootcamps/hack-reactor",
    techendo: "https://schools.techendo.com/schools/hack-reactor",
    twitter: "https://twitter.com/hackreactor",
    yelp: "http://www.yelp.com/biz/hack-reactor-san-francisco"
}];

var getBootcamps = function(urls) {
    var product = {
        title: "",
        description: "",
        logo: "",
        homePage: "",
        totalReviews: "",
        avgRating: "",
        totalSocial: "",
        angelList: {
            url: "",
            num: ""
        },
        courseReport: {
            url: "",
            num: ""
        },
        linkedin: {
            url: "",
            followers: ""
        },
        quora: {
            url: "",
            num: "",
            avg: "",
            followers: ""
        },
        switchup: {
            url: "",
            num: "",
            avg: "",
        },
        techendo: {
            url: "",
            num: "",
            positive: "",
            negative: ""
        },
        twitter: {
            url: "",
            followers: ""
        },
        yelp: {
            url: "",
            num: "",
            avg: ""
        }
    };
    var socialScore = 0;
    var reviewScore = 0;
    var ratingScore = 0;
    // scraping AngelList
    // var scrapeAngelList = function() {
    //     var angelListURL = urls.angelList;
    //     product.angelList.url = angelListURL;
    //     return axios.get(angelListURL)
    //         .then(function(res) {
    //             var $ = cheerio.load(res.data);
    //             var angelListStringFollowers = $('.tabs span').eq(2).children().children().text();
    //             console.log('AngelListString Followers', angelListStringFollowers);
    //             var angelListNumFollowers = numeral().unformat($('.tabs span').eq(2).children().children().text());
    //             console.log("AngelList Num Followers", angelListNumFollowers);
    //             product.angelList.followers = angelListNumFollowers;
    //             socialScore += angelListNumFollowers;
    //             //console.log(res.data);
    //         });
    // };
    // scraping Course Report
    var scrapeCourseReport = function() {
        var courseReportURL = urls.courseReport;
        product.courseReport.url = courseReportURL;
        return axios.get(courseReportURL)
            .then(function(res) {
                var $ = cheerio.load(res.data);
                var courseReportNumReviews = $('div.review').length;
                reviewScore += Number(courseReportNumReviews);
                console.log("Course Report Num Reviews", courseReportNumReviews);
                product.courseReport.num = Number(courseReportNumReviews);
                //console.log(res.data);
            });
    };
    // scraping LinkedIn
    var scrapeLinkedIn = function() {
        var linkedInURL = urls.linkedin;
        product.linkedin.url = linkedInURL;
        return axios.get(linkedInURL)
            .then(function(res) {
                var $ = cheerio.load(res.data);
                var linkedInString = ($("p.followers-count").text()).replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, " ");
                var linkedInNumFollowers = linkedInString.match(/\d/g);
                linkedInNumFollowers = linkedInNumFollowers.join("");
                console.log("LinkedIn Num Followers", Number(linkedInNumFollowers));
                socialScore += Number(linkedInNumFollowers);
                product.linkedin.followers = Number(linkedInNumFollowers);
                //console.log(res.data);
            });
    };
    // scraping Quora
    // adding on to rating
    var scrapeQuora = function() {
        var quoraURL = urls.quora;
        product.quora.url = quoraURL;
        return axios.get(quoraURL)
            .then(function(res) {
                var $ = cheerio.load(res.data);
                var quoraNumFollowers = numeral().unformat($('span.count', '.primary_item').text());
                console.log("Quora Num Followers", quoraNumFollowers);
                // adding to social score
                socialScore += quoraNumFollowers;
                var quoraNumReviews = numeral().unformat($('span.hidden', '.TopicReviewRatingLabel').find('span.count').find('span.value-title').attr('title'));
                console.log("Quora Num Reviews", quoraNumReviews);
                // adding to review score
                reviewScore += quoraNumReviews;
                var quoraAvgRating = numeral().unformat($('span.review_rating').children().length);
                console.log("Quora Avg Rating", quoraAvgRating);
                // adding to rating score
                ratingScore += quoraAvgRating;
                product.quora.num = quoraNumReviews;
                product.quora.avg = quoraAvgRating;
                product.quora.followers = quoraNumFollowers;
                //console.log(res.data);
            });
    };
    // scraping switchup
    // adding on to rating
    var scrapeSwitchup = function() {
        var switchupURL = urls.switchup;
        product.switchup.url = switchupURL;
        return axios.get(switchupURL)
            .then(function(res) {
                var $ = cheerio.load(res.data);
                var switchupNumReviews = numeral().unformat($("span[itemprop='reviewcount']").text());
                console.log("Switchup Num Reviews", switchupNumReviews);
                reviewScore += switchupNumReviews;
                var switchupAvgRating = numeral().unformat($("span[itemprop='ratingvalue']").text());
                console.log("Switchup Avg Rating", switchupAvgRating);
                ratingScore += switchupAvgRating;
                product.switchup.num = switchupNumReviews;
                product.switchup.avg = switchupAvgRating;
                //console.log(res.data);
            });
    };
    // scraping techendo
    var scrapeTechendo = function() {
        var techendoURL = urls.techendo;
        product.techendo.url = techendoURL;
        return axios.get(techendoURL)
            .then(function(res) {
                var $ = cheerio.load(res.data);
                var techendoPositiveReviews = $('div.rating span.positive-ratings-count').text();
                console.log("Techendo + Reviews", Number(techendoPositiveReviews));
                var techendoNegativeReviews = $('div.rating span.negative-ratings-count').text();
                console.log("Techendo - Reviews", Number(techendoNegativeReviews));
                var techendoNumReviews = Number(techendoPositiveReviews) + Number(techendoNegativeReviews);
                reviewScore += Number(techendoNumReviews);
                console.log("Techendo Num Reviews", Number(techendoNumReviews));
                product.techendo.positive = Number(techendoPositiveReviews);
                product.techendo.negative = Number(techendoNegativeReviews);
                product.techendo.num = Number(techendoNumReviews);
                //console.log(res.data);
            });
    };
    // scraping twitter
    var scrapeTwitter = function() {
        var twitterURL = urls.twitter;
        product.twitter.url = twitterURL;
        return axios.get(twitterURL)
            .then(function(res) {
                var $ = cheerio.load(res.data);
                var numStringFollowers = $(".ProfileNav").children().children().eq(2).children().children("span").text();
                // this comes out as Followers12445
                var twitterNumFollowers = numeral().unformat(numStringFollowers);
                console.log("Twitter Num Followers", Number(twitterNumFollowers));
                socialScore += Number(twitterNumFollowers);
                var twitterLogo = $('.ProfileAvatar-image').attr('src');
                console.log("Twitter Logo", twitterLogo);
                var twitterBio = $('.ProfileHeaderCard-bio').text();
                console.log("Twitter Bio", twitterBio);
                var twitterStringHomePage = $('a.u-textUserColor', '.ProfileHeaderCard').text();
                var twitterHomePage = twitterStringHomePage.replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, " ");
                console.log("Twitter Home Page", twitterHomePage);
                product.twitter.followers = Number(twitterNumFollowers);
                product.description = twitterBio;
                product.logo = twitterLogo;
                product.homePage = twitterHomePage;
                //console.log(res.data);
            });
    };
    // scraping yelp
    // adding on to rating
    var scrapeYelp = function() {
        var yelpURL = urls.yelp;
        product.yelp.url = yelpURL;
        return axios.get(yelpURL)
            .then(function(res) {
                var $ = cheerio.load(res.data);
                var yelpNumReviews = numeral().unformat($("span[itemprop='reviewCount']").text());
                console.log("Yelp Num Reviews", yelpNumReviews);
                reviewScore += yelpNumReviews;
                var floatAvgRating = $("meta[itemprop='ratingValue']").attr('content');
                var yelpAvgRating = Number(parseInt(floatAvgRating));
                console.log("Yelp Avg Rating", yelpAvgRating);
                ratingScore += yelpAvgRating;
                product.yelp.num = yelpNumReviews;
                product.yelp.avg = yelpAvgRating;
                //console.log(res.data);
            });
    };
    Promise.all([scrapeCourseReport(), scrapeLinkedIn(), scrapeQuora(), scrapeSwitchup(), scrapeTechendo(), scrapeTwitter(), scrapeYelp()])
        .then(function() {
            product.title = urls.title;
            product.totalReviews = reviewScore;
            product.avgRating = parseInt(ratingScore / 3);
            product.totalSocial = socialScore;
            console.log(product);
            return Product.create(product);
        });
};

for (var i = 0; i < urls.length; i++) {
    getBootcamps(urls[i]);
}

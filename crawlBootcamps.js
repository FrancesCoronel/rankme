var http = require("http");
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Product = Promise.promisifyAll(mongoose.model('Product'));
var axios = require("axios");
var request = require('request');
var cheerio = require('cheerio');

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
            followers: ""
        },
        courseReport: {
            url: "",
            num: "",
            avg: ""
        },
        facebook: {
            url: "",
            num: "",
            avg: "",
            likes: ""
        },
        googlePlus: {
            url: "",
            num: "",
            avg: "",
            followers: ""
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
    var scrapeAngelList = function() {
        var angelListURL = urls.angelList;
        product.angelList.url = angelListURL;
        return axios.get(angelListURL)
            .then(function(data) {
                var $ = cheerio.load(data);
                var angelListNumFollowers = $('.tabs span').eq(2).children().children().text();
                console.log("AngelList Num Followers", Number(angelListNumFollowers));
                product.angelList.followers = Number(angelListNumFollowers);
                socialScore += Number(angelListNumFollowers);
                //console.log(data);
            });
    };
    // scraping Course Report
    var scrapeCourseReport = function() {
        var courseReportURL = urls.courseReport;
        product.courseReport.url = courseReportURL;
        return axios.get(courseReportURL)
            .then(function(data) {
                var $ = cheerio.load(data);
                var numStringReviews = $('#reviews_tab').children().text();
                var courseReportNumReviews = numStringReviews.replace(/^\D+/g, '');
                reviewScore += Number(courseReportNumReviews);
                console.log("Course Report Num Reviews",courseReportNumReviews);
                product.courseReport.num = Number(courseReportNumReviews);
                //console.log(data);
            });
    };
    // scraping LinkedIn
    var scrapeLinkedIn = function() {
        var linkedInURL = urls.linkedin;
        product.linkedin.url = linkedInURL;
        return axios.get(linkedInURL)
            .then(function(data) {
                var $ = cheerio.load(data);
                var linkedInNumFollowers = $('.followers-count-num').text();
                socialScore += Number(linkedInNumFollowers);
                console.log("LinkedIn Num Followers", Number(linkedInNumFollowers));
                product.linkedin.followers = Number(linkedInNumFollowers);
                //console.log(data);
            });
    };
    // scraping Quora
    // adding on to rating
    var scrapeQuora = function() {
        var quoraURL = urls.quora;
        product.quora.url = quoraURL;
        return axios.get(quoraURL)
            .then(function(data) {
                var $ = cheerio.load(data);
                var quoraNumFollowers = $('span.count', '.primary_item').text();
                console.log("Quora Num Followers", Number(quoraNumFollowers));
                // adding to social score
                socialScore += Number(quoraNumFollowers);
                var quoraNumReviews = $('span.hidden', '.TopicReviewRatingLabel').find('span.count').find('span.value-title').attr('title');
                console.log("Quora Num Reviews", Number(quoraNumReviews));
                // adding to review score
                reviewScore += Number(quoraNumReviews);
                var quoraAvgRating = $('span.review_rating').children().length;
                console.log("Quora Avg Rating", Number(quoraAvgRating));
                // adding to rating score
                ratingScore += Number(quoraAvgRating);
                //product.quora.num = Number(quoraNumReviews);
                product.quora.avg = Number(quoraAvgRating);
                product.quora.followers = Number(quoraNumFollowers);
                //console.log(data);
            });
    };
    // scraping switchup
    // adding on to rating
    var scrapeSwitchup = function() {
        var switchupURL = urls.switchup;
        product.switchup.url = switchupURL;
        return axios.get(switchupURL)
            .then(function(data) {
                var $ = cheerio.load(data);
                var switchupNumReviews = $("span[itemprop='reviewCount']").text();
                console.log("Switchup Num Reviews", Number(switchupNumReviews));
                reviewScore += Number(switchupNumReviews);
                var switchupAvgRating = $("span[itemprop='ratingvalue']").text();
                console.log("Switchup Avg Rating", Number(switchupAvgRating));
                ratingScore += Number(switchupAvgRating);
                product.switchup.num = Number(switchupNumReviews);
                product.switchup.avg = Number(switchupAvgRating);
                //console.log(data);
            });
    };
    // scraping techendo
    var scrapeTechendo = function() {
        var techendoURL = urls.techendo;
        product.techendo.url = techendoURL;
        return axios.get(techendoURL)
            .then(function(data) {
                var $ = cheerio.load(data);
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
                //console.log(data);
            });
    };
    // scraping twitter
    var scrapeTwitter = function() {
        var twitterURL = urls.twitter;
        product.twitter.url = twitterURL;
        return axios.get(twitterURL)
            .then(function(data) {
                var $ = cheerio.load(data);
                var numStringFollowers = $(".ProfileNav").children().children().eq(2).children().children("span").text();
                // this comes out as Followers12445
                var twitterNumFollowers = numStringFollowers.replace(/^\D+/g, '');
                console.log("Twitter Num Followers", Number(twitterNumFollowers));
                socialScore += Number(twitterNumFollowers);
                var twitterLogo = $('.ProfileAvatar-image').attr('src');
                console.log("Twitter Logo", twitterLogo);
                var twitterBio = $('.ProfileHeaderCard-bio').text();
                console.log("Twitter Bio", twitterBio);
                var twitterHomePage = $('a.u-textUserColor', '.ProfileHeaderCard').text();
                console.log("Twitter Home Page", twitterHomePage);
                product.twitter.followers = Number(twitterNumFollowers);
                product.description = twitterBio;
                product.logo = twitterLogo;
                product.homePage = twitterHomePage;
                //console.log(data);
            });
    };
    // scraping yelp
    // adding on to rating
    var scrapeYelp = function() {
        var yelpURL = urls.yelp;
        product.yelp.url = yelpURL;
        return axios.get(yelpURL)
            .then(function(data) {
                var $ = cheerio.load(data);
                var yelpNumReviews = $("span[itemprop='reviewCount']").text();
                console.log("Yelp Num Reviews", Number(yelpNumReviews));
                reviewScore += Number(yelpNumReviews);
                var floatAvgRating = $("meta[itemprop='ratingValue']").attr('content');
                var yelpAvgRating = Number(floatAvgRating) | 0;
                console.log("Yelp Avg Rating", Number(yelpAvgRating));
                ratingScore += Number(yelpAvgRating);
                //console.log(data);
            });
    };
    Promise.all([scrapeAngelList(), scrapeCourseReport(), scrapeLinkedIn(), scrapeQuora(), scrapeSwitchup(), scrapeTechendo(), scrapeTwitter(), scrapeYelp()])
        .then(function() {
            product.title = urls.title;
            product.totalReviews = reviewScore;
            product.avgRating = ratingScore / 3;
            product.totalSocial = socialScore;
            console.log(product);
            return Product.create(product);
        });
};

for (var i = 0; i < urls.length; i++) {
    getBootcamps(urls[i]);
}

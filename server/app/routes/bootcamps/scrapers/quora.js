// var request = require('request');
// var cheerio = require('cheerio');

// router.get('/:url', function(req, res, next) {
//     request(req.params.url, function(err, res, body) {
//         if (!err & res.statusCode === 200) {
//             var $ = cheerio.load(body);
//             var numReviews = $('span.count', '.primary_item').text();
//             console.log(numReviews);
//             var avgRating = $('span.review_rating').children().length;
//             console.log(avgRating);
//             res.json({
//                 numReviews: numReviews,
//                 avgRating: avgRating
//             });
//         }
//     });
// });
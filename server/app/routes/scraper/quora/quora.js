// url = "https://www.quora.com/Fullstack-Academy";

// $.get(url, function(html) {
//   var $html = $(html);
//   console.log($html.find("span.TopicFollowButton").find("span.count").html());
// });

// var request = require('request'),
//     cheerio = require('cheerio'),
//     urls = [];

// request('http://www.reddit.com', function(err, res, body) {
//   if (!err & res.statusCode == 200) {
//     var $ = cheerio.load(body);

//     $('a.title', '#siteTable').each(function() {
//       var url = (this.attribs['href']);
//       urls.push(url);
//     });

//     console.log(urls);
//   }
// });
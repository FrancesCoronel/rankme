module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/robopocalypse",
  "SESSION_SECRET": "The Hawk is mad.",
  "TWITTER": {
    "consumerKey": "gQOR7nQFtRPg8QoPxT4uXKwdY",
    "consumerSecret": "E9SMqkn6gHi68nA5kHTpA6cjbJYsLdiL8ysf6Y2NJwSYrNzbyi",
    // twitter doesn't like localhost callback url, unfortunately, so I replaced with my IP
    "callbackUrl": "http://192.168.1.0.8/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "",
    "clientSecret": "",
    "callbackURL": ""
  },
  "GOOGLE": {
    "clientID": "",
    "clientSecret": "",
    "callbackURL": ""
  }
};
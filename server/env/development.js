module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/robopocalypse",
  "SESSION_SECRET": "The Hawk is mad.",
  "TWITTER": {
    "consumerKey": "OAMQD9MGsYOfCmGtOtka2inBQ",
    "consumerSecret": "7wSKRw9ebWzhlI1cuDjLOymcPi4GMFMbGkpR9hNS9TuA0zYOU9",
    // twitter doesn't like localhost callback url, unfortunately, so I replaced with my IP
    "callbackUrl": "http://192.168.1.213:1337/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "871027879654745",
    "clientSecret": "fe0a210fc85947dc0252f3c088e58f16",
    "callbackURL": "http://localhost:1337/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "812434981264-s8sqofumpvrkebffh25fk4omhskj6jdh.apps.googleusercontent.com",
    "clientSecret": "HD-5hNBNKMIKZYxUY-bCOvqx",
    "callbackURL": "http://localhost:1337/auth/google/callback"
  }
};
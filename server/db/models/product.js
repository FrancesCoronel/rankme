'use strict';
var mongoose = require('mongoose');
var searchPlugin = require("mongoose-search-plugin");

var schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    logo: {
        type: String,
        default: "http://wiki.solid-run.com/images/7/75/No_image_available.png"
    },
    homePage: {
        type: String
    },
    totalReviews: {
        type: Number
    },
    avgRating: {
        type: Number
    },
    totalSocial: {
        type: Number
    },
    angelList: {
        url: {
            type: String
        },
        followers: {
            type: Number
        }
    },
    courseReport: {
        url: {
            type: String
        },
        num: {
            type: Number
        },
        avg: {
            type: Number
        }
    },
    facebook: {
        url: {
            type: String
        },
        num: {
            type: Number
        },
        avg: {
            type: Number
        },
        likes: {
            type: Number
        }
    },
    googlePlus: {
        url: {
            type: String
        },
        num: {
            type: Number
        },
        avg: {
            type: Number
        },
        followers: {
            type: Number
        }
    },
    linkedin: {
        url: {
            type: String
        },
        followers: {
            type: Number
        }
    },
    quora: {
        url: {
            type: String
        },
        num: {
            type: Number
        },
        avg: {
            type: Number
        },
        followers: {
            type: Number
        }
    },
    switchup: {
        url: {
            type: String
        },
        num: {
            type: Number
        },
        avg: {
            type: Number
        },
    },
    techendo: {
        url: {
            type: String
        },
        num: {
            type: Number
        },
        positive: {
            type: Number
        },
        negative: {
            type: Number
        }
    },
    twitter: {
        url: {
            type: String
        },
        followers: {
            type: Number
        }
    },
    yelp: {
        url: {
            type: String
        },
        num: {
            type: Number
        },
        avg: {
            type: Number
        }
    }
});

schema.plugin(searchPlugin, {
    fields: ["title", "description", "logo"]
});

mongoose.model('Product', schema);
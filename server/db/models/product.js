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
        type: Number,
        default: 0
    },
    avgRating: {
        type: Number,
        default: 0
    },
    totalSocial: {
        type: Number,
        default: 0
    },
    angelList: {
        url: {
            type: String
        },
        followers: {
            type: Number,
            default: 0
        }
    },
    courseReport: {
        url: {
            type: String
        },
        num: {
            type: Number,
            default: 0
        },
        avg: {
            type: Number,
            default: 0
        }
    },
    facebook: {
        url: {
            type: String
        },
        num: {
            type: Number,
            default: 0
        },
        avg: {
            type: Number,
            default: 0
        },
        likes: {
            type: Number,
            default: 0
        }
    },
    googlePlus: {
        url: {
            type: String
        },
        num: {
            type: Number,
            default: 0
        },
        avg: {
            type: Number,
            default: 0
        },
        followers: {
            type: Number,
            default: 0
        }
    },
    linkedin: {
        url: {
            type: String
        },
        followers: {
            type: Number,
            default: 0
        }
    },
    quora: {
        url: {
            type: String
        },
        num: {
            type: Number,
            default: 0
        },
        avg: {
            type: Number,
            default: 0
        },
        followers: {
            type: Number,
            default: 0
        }
    },
    switchup: {
        url: {
            type: String
        },
        num: {
            type: Number,
            default: 0
        },
        avg: {
            type: Number,
            default: 0
        },
    },
    techendo: {
        url: {
            type: String
        },
        num: {
            type: Number,
            default: 0
        },
        positive: {
            type: Number,
            default: 0
        },
        negative: {
            type: Number,
            default: 0
        }
    },
    twitter: {
        url: {
            type: String
        },
        followers: {
            type: Number,
            default: 0
        }
    },
    yelp: {
        url: {
            type: String
        },
        num: {
            type: Number,
            default: 0
        },
        avg: {
            type: Number,
            default: 0
        }
    }
});

schema.plugin(searchPlugin, {
    fields: ["title", "description", "logo"]
});

mongoose.model('Product', schema);